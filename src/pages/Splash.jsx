import React from 'react'
import bgImage from '../assets/bgimage.png'
import { Link } from 'react-router-dom'

const Splash = () => {
  return (
    <div className="lg:w-md lg:mx-auto h-screen items-center justify-between flex flex-col" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
        <div className='mt-28 text-center'>
            <h1 className='text-[#FF7A00] font-medium text-4xl'>CS<span className='text-[#3152FA] italic'>Vote</span></h1>
            <p>Your voting experience redefined</p>
        </div>
        <div className='mt-64 flex items-center gap-4'>
            <Link to="/sign-up">
              <button className='bg-[#3152FA] text-white rounded-3xl px-7 py-2 cursor-pointer'>Sign up</button>
            </Link>
            <p>OR</p>
            <Link to="/sign-in">
              <button className='border border-[#FF7A00] text-[#FF7A00] rounded-3xl px-7 py-2 cursor-pointer'>Sign in</button>
            </Link>
        </div>
        <div className='text-center text-sm pb-6'>
            <p>Our <span className='font-bold'>Privacy Policy</span> and <span className='font-bold'>Terms of Service</span></p>
            <p>Your credentials are secured with end-to-end encryption</p>
        </div>
    </div>
  )
}

export default Splash