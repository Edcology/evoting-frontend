import React from 'react'
import Nav from '../components/Nav'
import SideBar from '../components/SideBar'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div className='px-2 h-screen flex flex-col'>
      <div className='py-2 mb-2'>
        <Nav />
      </div>
      {/* This div should be flex and contain both SideBar and main */}
      <div className='flex flex-1 min-h-0 pb-3'>
        <SideBar />
        <main className='flex-1 overflow-auto'>
            <h1 className='font-medium text-2xl px-4 mb-4'>Hello <span className='text-[#FF7A00]'>Admin</span></h1>
            <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminDashboard