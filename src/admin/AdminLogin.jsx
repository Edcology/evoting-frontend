import React, { useState } from 'react'
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Privacy from '../components/Privacy'
import { authService } from '../services/api'
import { useAuth } from '../hooks/useAuth'

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    const [clicked, setClicked] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            const response = await authService.login(formData)
            const token = response.data.token
            login(token)
            
            // Redirect to intended destination or default to active-election
            const from = location.state?.from?.pathname || '/admin/dashboard'
            navigate(from, { replace: true })
        } catch (err) {
            const message = err.response?.data?.message || 'Login failed'
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
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 px-4 mt-8'>
            {error && <p className='text-red-500 text-center'>{error}</p>}
            <label htmlFor="username" className='grid font-medium'>Matric No
                <input className='w-full bg-[#F6F6F6] focus:outline-none py-2 rounded-3xl px-3' type="text" placeholder='e.g 20210294***' value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} required />
            </label>
            <label htmlFor="password" className='grid font-medium relative'>Password
                <input className='w-full bg-[#F6F6F6] focus:outline-none py-2 rounded-3xl px-3' type={clicked ? "text" : "password"} placeholder='***********' value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required />
                    <button type="button" className="absolute right-3 bottom-2" onClick={() => setClicked(!clicked)}>
                        {
                            clicked ? <MdOutlineVisibilityOff className="size-6" /> :
                            <MdOutlineVisibility className="cursor-pointer size-6" />
                        }
                    </button>
            </label>
            <p className="font-medium mb-4"><Link to='/forgot-password'>Forgot Password?</Link></p>
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
                ): "Sign in"}
            </button>
            <p className='text-center font-medium'>You don't have an account? <span className='text-[#FF7A00]'><Link to='/sign-up'>Sign up</Link></span></p>
        </form>
        <Privacy />
    </div>
  )
}

export default AdminLogin