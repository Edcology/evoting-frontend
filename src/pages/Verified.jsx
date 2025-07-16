import React from 'react'
import verified from '../assets/verified.png'
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Privacy from '../components/Privacy';

const Verified = () => {
  const [isLoading] = useState(false);
  const {user} = useAuth();
  console.log(user.user);
  return (
    <div className='lg:w-md lg:mx-auto flex flex-col items-center h-screen justify-center px-4 -mt-10'>
        <div className='items-center justify-center mb-4'>
            <img src={verified} alt="New Password Icon" />
        </div>
        <h2 className='font-medium text-xl mb-2'>Account Verified</h2>
        <p className='text-sm text-center mb-8'>Your account was successfully verified, you can now Sign in into your account</p>
        <Link to={user.user?.isAdmin === true ? "/admin/login" : "/sign-in"} className='w-full max-w-sm'>
            <button 
                type="button" 
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
                ): "Sign in"}
            </button>
        </Link>
        <Privacy />
    </div>
  )
}

export default Verified