import React, { useState } from 'react'
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import Privacy from '../components/Privacy'
import { authService } from '../services/api'
import { useAuth } from '../hooks/useAuth'

const AdminRegister = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        verifyPassword: "",
        adminSecret: ""
    })
    const [clicked, setClicked] = useState({
        password: false,
        verifyPassword: false
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const { register } = useAuth()
    const navigate = useNavigate()

    const validateForm = () => {
        if (formData.password !== formData.verifyPassword) {
            setError('Passwords do not match')
            return false
        }
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long')
            return false
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
            setError('Please enter a valid email address')
            return false
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        
        if (!validateForm()) return

        setIsLoading(true)

        try {
            const response = await authService.registerAdmin({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                adminSecret: formData.adminSecret
            })
            
            register(response.data.token)
            navigate('/verify-account')
        } catch (err) {
            const message = err.response?.data?.message || 'Registration failed'
            setError(message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <div className='mt-20 mb-10 text-center'>
                <h1 className='text-[#FF7A00] font-medium text-4xl'>CS<span className='text-[#3152FA] italic'>Vote</span></h1>
                <p>Your voting experience redefined</p>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 px-4 mt-8 mb-8'>
                {error && <p className='text-red-500 text-center'>{error}</p>}
                <label htmlFor="username" className='grid font-medium'>Username
                    <input 
                        className='w-full bg-[#F6F6F6] focus:outline-none py-2 rounded-3xl px-3' 
                        type="text" 
                        placeholder='e.g 20210294***' 
                        value={formData.username} 
                        onChange={(e) => setFormData({...formData, username: e.target.value})} 
                        required 
                    />
                </label>
                <label htmlFor="email" className='grid font-medium'>Email
                    <input 
                        className='w-full bg-[#F6F6F6] focus:outline-none py-2 rounded-3xl px-3' 
                        type="email" 
                        placeholder='e.g csvote@email.com' 
                        value={formData.email} 
                        onChange={(e) => setFormData({...formData, email: e.target.value})} 
                        required 
                    />
                </label>
                <label htmlFor="password" className='grid font-medium relative'>Password
                    <input 
                        className='w-full bg-[#F6F6F6] focus:outline-none py-2 rounded-3xl px-3' 
                        type={clicked.password ? "text" : "password"} 
                        placeholder='***********' 
                        value={formData.password} 
                        onChange={(e) => setFormData({...formData, password: e.target.value})} 
                        required 
                    />
                    <button 
                        type="button" 
                        className="absolute right-3 bottom-2" 
                        onClick={() => setClicked({...clicked, password: !clicked.password})}
                    >
                        {clicked.password ? 
                            <MdOutlineVisibilityOff className="size-6" /> :
                            <MdOutlineVisibility className="cursor-pointer size-6" />
                        }
                    </button>
                </label>
                <label htmlFor="verifyPassword" className='grid font-medium relative'>Verify Password
                    <input 
                        className='w-full bg-[#F6F6F6] focus:outline-none py-2 rounded-3xl px-3' 
                        type={clicked.verifyPassword ? "text" : "password"} 
                        placeholder='***********' 
                        value={formData.verifyPassword} 
                        onChange={(e) => setFormData({...formData, verifyPassword: e.target.value})} 
                        required 
                    />
                    <button 
                        type="button" 
                        className="absolute right-3 bottom-2" 
                        onClick={() => setClicked({...clicked, verifyPassword: !clicked.verifyPassword})}
                    >
                        {clicked.verifyPassword ? 
                            <MdOutlineVisibilityOff className="size-6" /> :
                            <MdOutlineVisibility className="cursor-pointer size-6" />
                        }
                    </button>
                </label>
                <label htmlFor="username" className='grid font-medium'>Admin Secret
                    <input 
                        className='w-full bg-[#F6F6F6] focus:outline-none py-2 rounded-3xl px-3' 
                        type="text" 
                        placeholder='*******' 
                        value={formData.adminSecret} 
                        onChange={(e) => setFormData({...formData, adminSecret: e.target.value})} 
                        required 
                    />
                </label>
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full rounded-3xl bg-[#3152FA] text-white py-2 cursor-pointer disabled:opacity-50"
                >
                    {isLoading ? (
                        <svg className="animate-spin h-5 w-5 mx-auto" viewBox="0 0 24 24">
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
                    ): "Sign up"}
                </button>
                <p className='text-center font-medium'>Already have an account? <span className='text-[#FF7A00]'><Link to='/sign-in'>Sign in</Link></span></p>
            </form>
            <div className='text-center text-sm px-4'>
                <p>Our <span className='font-medium text-[#FF7A00]'>Privacy Policy</span> and <span className='font-medium text-[#FF7A00]'>Terms of Service</span></p>
                <p className='text-center'>Your credentials are secured with end-to-end encryption</p>
            </div>
        </div>
    )
}

export default AdminRegister