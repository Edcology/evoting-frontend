import React from 'react'
import mail from '../assets/mail.png'
import { Link } from 'react-router-dom'
import Privacy from '../components/Privacy'

const CheckYourMail = () => {
  return (
    <div className='lg:w-md lg:mx-auto flex flex-col items-center h-screen justify-center -mt-10'>
        <div className='bg-[#FFE3A5] p-5 rounded-full items-center justify-center mb-4'>
            <img src={mail} alt="Password icon" />
        </div>
        <h1 className='text-xl font-medium mb-2'>Check Your Mail</h1>
        <p className='text-sm mb-10'>A link to verify your password has been sent to your mail</p>
        <p className='text-center text-sm font-medium'>You don't have an account? <span className='text-[#FF7A00]'><Link to='/sign-up'>Sign up</Link></span></p>
        <Privacy />
    </div>
  )
}

export default CheckYourMail