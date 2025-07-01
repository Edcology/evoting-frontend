import React, { useState } from 'react'
import pswd from '../assets/pswd.png'
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md'
import Privacy from '../components/Privacy'
import { authService } from '../services/api'

const CreateNewPassword = () => {
    const [clicked, setClicked] = useState(
        {
            newPassword: false,
            confirmPassword: false
        }
    )
    const [formData, setFormData] = useState(
        {
            newPassword: "",
            confirmPassword: ""
        }
    )
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(location.search)
    const token = queryParams.get('token') || queryParams.get('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (formData.newPassword !== formData.confirmPassword) {
            setError("Passwords do not match")
            return
        }
        
        try {
            await authService.resetPassword(token, formData.newPassword)
            navigate('/new-password-created')
        } catch (err) {
            const message = err.response?.data?.message || 'Error creating new password'
            setError(message)
        } finally {
            setIsLoading(false)
        }
    }
  return (
    <div className='flex flex-col items-center h-screen justify-center px-4 -mt-10'>
        <div className='flex flex-col items-center justify-center'>
            <div className='bg-[#FFE3A5] p-5 px-6 rounded-full flex flex-col items-center justify-center mb-6'>
                <img src={pswd} alt="Password icon" />
            </div>
            <h2 className='font-medium text-xl mb-2'>Create New Password?</h2>
            <p className='text-sm text-center'>Choose a strong password to keep your account safe and secure.</p>
        </div>
        <div className='w-full max-w-sm'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                {error && <p className='bg-red-200 p-2 text-red-500 text-center'>{error}</p>}
                <label htmlFor="password" className='grid font-medium relative'>Password
                    <input className='w-full bg-[#F6F6F6] focus:outline-none py-2 rounded-3xl px-3' type={clicked.newPassword ? "text" : "password"} placeholder='***********' value={formData.newPassword} onChange={(e) => setFormData({...formData, newPassword: e.target.value})} required />
                        <button type="button" className="absolute right-3 bottom-2" onClick={() => setClicked({...clicked, newPassword: !clicked.newPassword})}>
                            {
                                clicked.newPassword ? <MdOutlineVisibilityOff className="size-6" /> :
                                <MdOutlineVisibility className="cursor-pointer size-6" />
                            }
                        </button>
                </label>
                <label htmlFor="confirmPassword" className='grid font-medium relative'>Confirm Password
                    <input className='w-full bg-[#F6F6F6] focus:outline-none py-2 rounded-3xl px-3' type={clicked.confirmPassword ? "text" : "password"} placeholder='***********' value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} required />
                        <button type="button" className="absolute right-3 bottom-2" onClick={() => setClicked({...clicked, confirmPassword: !clicked.confirmPassword})}>
                            {
                                clicked.confirmPassword ? <MdOutlineVisibilityOff className="size-6" /> :
                                <MdOutlineVisibility className="cursor-pointer size-6" />
                            }
                        </button>
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
                    ): "Create Password"}
                </button>
            </form>
        </div>
        <Privacy />
    </div>
  )
}

export default CreateNewPassword