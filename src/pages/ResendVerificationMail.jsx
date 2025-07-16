import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../services/api'

const ResendVerificationMail = () => {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            await authService.resendVerification(email);
            navigate('/verify-account');
        } catch (err) {
            const message = err.response?.data?.message || 'Error sending verification email';
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='flex flex-col lg:w-md lg:mx-auto'>
            <div className='mt-20 mb-10 text-center'>
                <h1 className='text-[#FF7A00] font-medium text-4xl'>CS<span className='text-[#3152FA] italic'>Vote</span></h1>
                <p>Your voting experience redefined</p>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 px-4 mt-8'>
                {error && <p className='bg-red-200 p-2 text-red-500 text-center'>{error}</p>}
                <label htmlFor="username" className='grid font-medium'>Email
                    <input className='w-full bg-[#F6F6F6] focus:outline-none py-2 rounded-3xl px-3' type="email" placeholder='e.g csvote@abc.com' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full rounded-3xl bg-[#3152FA] text-white py-2 cursor-pointer">
                    {isLoading ? (
                        <svg className="animate-spin h-5 w-5 justify-self-center" viewBox="0 0 24 24">
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    ): "Resend Verification Mail"}
                </button>
                <p className='text-center font-medium'>You don't have an account? <span className='text-[#FF7A00]'><Link to='/sign-up'>Sign up</Link></span></p>
            </form>
        </div>
    )
}

export default ResendVerificationMail;