import React from 'react'
import npswd from '../assets/npswd.png'
import { Link } from 'react-router-dom'

import { useState } from 'react';
import Privacy from '../components/Privacy';

const NewPasswordCreated = () => {
  const [isLoading] = useState(false);
  return (
    <div className='lg:w-md lg:mx-auto flex flex-col items-center h-screen justify-center px-4 -mt-10'>
        <div className='items-center justify-center mb-4'>
            <img src={npswd} alt="New Password Icon" />
        </div>
        <h2 className='font-medium text-xl mb-2'>New Password Created</h2>
        <p className='text-sm text-center mb-8'>You can now sign in with our new password.</p>
        <Link to={"/sign-in"} className='w-full max-w-sm'>
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

export default NewPasswordCreated