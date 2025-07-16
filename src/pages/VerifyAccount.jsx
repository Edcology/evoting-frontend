import React from 'react'
import verify from '../assets/verify.png'
import { Link } from 'react-router-dom'
import Privacy from '../components/Privacy'

const VerifyAccount = () => {
  return (
    <div className='lg:w-md lg:mx-auto flex flex-col items-center h-screen justify-center -mt-10 text-center px-2'>
        <div className='bg-[#FFE3A5] p-4 rounded-full flex flex-col items-center justify-center mb-6'>
            <img src={verify} alt="Password icon" />
        </div>
        <h2 className='font-medium text-xl mb-2'>Verify Your Account</h2>
        <p className='text-sm mb-12'>A verification link to  has been sent to your mail, verify your account to start using CSVote</p>
        <p className='text-center font-medium'>Already have an account? <span className='text-[#FF7A00]'><Link to='/sign-in'>Sign in</Link></span></p>
        <Privacy />
    </div>
  )
}

export default VerifyAccount