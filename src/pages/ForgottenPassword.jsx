import React, { useState } from 'react'
import pswd from '../assets/pswd.png'
import { Link, useNavigate } from 'react-router-dom'
import Privacy from '../components/Privacy'
import { authService } from '../services/api'

const ForgottenPassword = () => {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            await authService.forgotPassword(email)
            navigate('/check-your-mail')
        } catch (err) {
            const message = err.response?.data?.message || 'Error sending verification email'
            setError(message)
        } finally {
            setIsLoading(false)
        }
    }
  return (
    <div className=' flex flex-col items-center justify-center h-screen -mt-10'>
        <div className='flex flex-col items-center justify-center mb-10 '>
            <div className='bg-[#FFE3A5] p-5 px-6 rounded-full flex flex-col items-center justify-center mb-6'>
                <img src={pswd} alt="Password icon" />
            </div>
            <h2 className='font-medium text-xl mb-2'>Forgotten Your Password?</h2>
            <p className='text-sm'>Enter your email to get a recovery link</p>
        </div>
        <div className='w-full max-w-sm px-2'>
            <form onSubmit={handleSubmit}>
                {error && <p className='bg-red-200 p-2 text-red-500 text-center'>{error}</p>}
                <label htmlFor="matricNo" className='grid font-medium mb-5'>Email
                    <input className='w-full bg-[#F6F6F6] focus:outline-none py-2 rounded-3xl px-3 mt-1' type="email" placeholder='e.g abc@csvote.com' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full rounded-3xl bg-[#3152FA] text-white py-2 cursor-pointer mb-10">
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
                    ): "Continue"}
                </button>
                <p className='text-center font-medium'>You don't have an account? <span className='text-[#FF7A00]'><Link to='/sign-up'>Sign up</Link></span></p>
            </form>
        </div>
        <Privacy />
    </div>
  )
}

export default ForgottenPassword