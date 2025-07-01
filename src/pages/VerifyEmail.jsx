import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import verify from '../assets/verify.png';
import end from '../assets/end.png';
import { authService } from '../services/api';

const VerifyEmail = () => {
    const [verificationStatus, setVerificationStatus] = useState({
        loading: true,
        success: false,
        message: 'Verifying your email...'
    });
    
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        const verifyEmailToken = async () => {
            const queryParams = new URLSearchParams(location.search);
            const token = queryParams.get('token') || queryParams.get('');
            
            if (!token) {
                setVerificationStatus({
                    loading: false,
                    success: false,
                    message: 'Invalid verification link. No token provided.'
                });
                return;
            }
            
            try {
                const response = await authService.verifyEmail(token);
                
                setVerificationStatus({
                    loading: false,
                    success: true,
                    message: response.data.message,
                    email: response.data.email
                });
                
                setTimeout(() => {
                    navigate('/verified');
                }, 5000);
                
            } catch (err) {
                setVerificationStatus({
                    loading: false,
                    success: false,
                    message: err.response?.data?.message || 'Verification failed. Please try again.'
                });
            }
        };
        
        verifyEmailToken();
    }, [location, navigate]);
    
    return (
        <div>
            {
                verificationStatus.loading ? (
                    <div className='flex flex-col items-center h-screen justify-center -mt-10 text-center px-2'>
                        <div className='bg-[#FFE3A5] p-4 rounded-full flex flex-col items-center justify-center mb-6'>
                            <img src={verify} alt="Password icon" />
                        </div>
                        <h2 className='font-medium text-xl mb-2'>{verificationStatus.message}</h2>
                    </div>
                ) : (
                    verificationStatus.success ? (
                        <div className='flex flex-col items-center h-screen justify-center -mt-10 text-center px-2'>
                            <div className='bg-[#FFE3A5] p-4 rounded-full flex flex-col items-center justify-center mb-6'>
                                <img src={verify} alt="Password icon" />
                            </div>
                            <h2 className='font-medium text-xl mb-2'>Email Verified!</h2>
                            <p className='text-sm mb-12'>{verificationStatus.message}</p>
                        </div>
                    ) : (
                        <div className='flex flex-col items-center h-screen justify-center -mt-10 text-center px-2'>
                            <div className='bg-[#FFE3A5] p-4 rounded-full flex flex-col items-center justify-center mb-6'>
                                <img src={end} alt="Password icon" />
                            </div>
                            <h2 className='font-medium text-xl mb-2'>Verification Failed</h2>
                            <p className='text-sm mb-12'>{verificationStatus.message}</p>
                            <p className='text-center font-medium '><Link to='/resend-verification-mail'>Resend Verification Mail</Link></p>
                        </div>
                    )
                ) 
            }
        </div>
    );
};

export default VerifyEmail;