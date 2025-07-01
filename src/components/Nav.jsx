import React, { useEffect, useState } from 'react'
import { FaRegUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { CiWallet } from 'react-icons/ci'

const Nav = () => {
  const [clicked, setClicked] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  // Add function to truncate email
  const truncateEmail = (email) => {
    if (!email) return 'Loading...'
    const [username, domain] = email.split('@')
    if (username.length <= 3) return email
    return `${username.slice(0, 3)}...@${domain}`
  }

  // Add function to truncate wallet address
  const truncateWallet = (wallet) => {
    if (!wallet) return 'Loading...'
    if (wallet.length <= 10) return wallet
    return `${wallet.slice(0, 6)}...${wallet.slice(-4)}`
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (clicked && !event.target.closest('.dropdown')) {
        setClicked(false)
      }
    }
  
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [clicked])

  const handleSignOut = () => {
    logout()
    navigate('/sign-in')
  }

  return (
    <div className='flex justify-between items-center p-4 px-1 lg:bg-[#FFFAEC] lg:rounded-2xl lg:px-4'>
      <h1 className='text-[#FF7A00] font-medium text-3xl'>CS<span className='text-[#3152FA] italic'>Vote</span></h1>
      {/* Profile button for mobile */}
      <div 
        className='rounded-full bg-[#E7E7E7] p-2 cursor-pointer block lg:hidden' 
        onClick={(e) => {
          setClicked(true) 
          e.stopPropagation()
        }}
      >
        <FaRegUser />
      </div>
      {/* Profile info for large screens */}
      <div 
        className='hidden lg:flex items-center gap-2 bg-white p-1 rounded-xl cursor-pointer'
        onClick={(e) => {
          setClicked(true) 
          e.stopPropagation()
        }}
        >
        <div className='text-[#823A0C] bg-[#FFF3D3] p-2 rounded-full'>
          <FaRegUser />
        </div>
        <span className='text-[#823A0C] font-medium'>
          {truncateEmail(user?.user?.email)}
        </span>
      </div>
      {clicked && (
        <div className='absolute top-1 right-2 bg-[#FFF3D3] shadow-lg rounded-2xl p-2 flex flex-col gap-2 dropdown lg:px-4'>
          <div className='grid gap-2'>
            <div className='flex items-center gap-2  bg-white p-1 rounded-2xl'>
              <div className='bg-[#FFF3D3] rounded-full p-2 text-[#823A0C]'>
                <CiWallet className='size-6' />
              </div>
              <p
                className='text-sm truncate max-w-[200px] cursor-pointer'
                title={user?.user.walletPublicKey}
                onClick={() => {
                  if (user?.user.walletPublicKey) {
                    navigator.clipboard.writeText(user.user.walletPublicKey);
                    alert('Wallet address copied to clipboard');
                  }
                }}
              >
                {truncateWallet(user?.user.walletPublicKey)}
              </p>
            </div>
            <div className='flex items-center gap-2  bg-white p-1 rounded-2xl'>
              <div className='bg-[#FFF3D3] rounded-full p-2 text-[#823A0C]'>
                <FaRegUser className='size-6' />
              </div>
              <p className='text-sm truncate max-w-[200px]'>
                {truncateEmail(user?.user?.email)}
              </p>
            </div>
          </div>
          <div className='w-full'>
            <button 
              onClick={handleSignOut}
              className='border border-[#FF7A00] text-[#FF7A00] font-medium py-2 px-4 rounded-2xl w-full hover:bg-[#FF7A00] hover:text-white transition-colors'
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Nav