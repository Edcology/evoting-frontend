const config = {
    API_URL: import.meta.env.VITE_API_URL || 'https://evoting-backend-dsaw.onrender.com/api',
    TOKEN_KEY: 'token',
    DEFAULT_ELECTION_POLL_INTERVAL: 120000, // 1 minute
    DEFAULT_RESULTS_POLL_INTERVAL: 120000,
    RESULTS_POLL_INTERVAL: 120000
};

export default config;