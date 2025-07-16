import axios from 'axios';
import config from '../config/config';

// Create axios instance with default config
const api = axios.create({
    baseURL: config.API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle expired tokens
        if (error.response?.status === 401 && error.response?.data?.message?.includes('expired')) {
            localStorage.removeItem(config.TOKEN_KEY);
            window.location.href = '/sign-in';
        }

        // Handle network errors
        if (!error.response) {
            error.response = {
                data: {
                    message: 'Network error. Please check your internet connection.'
                }
            };
        }

        // Handle unexpected server errors
        if (error.response.status >= 500) {
            error.response.data = {
                message: 'Server error. Please try again later.'
            };
        }

        return Promise.reject(error);
    }
);

// Auth services
export const authService = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    registerAdmin: (userData) => api.post('/auth/register-admin', userData),
    forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
    resetPassword: (token, newPassword) => api.post('/auth/reset-password', { token, newPassword }),
    verifyEmail: (token) => api.post('/auth/verify-email', { token }),
    resendVerification: (email) => api.post('/auth/resend-verification', { email }),
    getProfile: () => api.get('/auth/profile')
};

// Election services
export const electionService = {
    getActiveElections: () => api.get('/elections/active'),
    getElectionDetails: (electionId) => api.get(`/elections/${electionId}`),
    vote: (voteData) => api.post(`/votes/submit`, voteData),
    getVoteSummary: () => api.get(`votes/my`),
    getPostCandidates: (postId) => api.get(`/posts/${postId}/candidates`),
    checkVoteStatus: (electionId) => api.get(`/votes/status/${electionId}`)
};

// Admin services
export const adminService = {
    getAllElections: () => api.get('/elections/admin/all'),
    getInitializedElections: () => api.get('/elections/admin/unstarted'),
    initializeElection: (electionData) => api.post('/elections/initialize', electionData),
    startElection: (electionId) => api.post(`/elections/${electionId}/start`),
    endElection: (electionId) => api.post(`/elections/${electionId}/end`),
    closeElection: (electionId) => api.post(`/elections/${electionId}/close`),
    getAdminProfile: () => api.get('/admin/my'),
    airdropSol: () => api.post('/airdrop/all')
}
export default api;