import React, { useState } from 'react'
import { AiOutlineHistory, AiOutlinePlus } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa'
import { FiPlus } from 'react-icons/fi'
import { RiExpandLeftLine, RiExpandRightLine, RiHomeLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const SideBar = () => {
    const [expanded, setExpanded] = useState(false)
    const [selected, setSelected] = useState('home')
  return (
    <div className={`flex flex-col ${expanded ? "w-38" : "w-17"} bg-[#FFFAEC] h-full p-3 rounded-2xl gap-6`}>
        <div className='flex justify-center'>
            {
                expanded ? (
                    <div className='text-[#FF7A00] cursor-pointer' onClick={() => setExpanded(false)}>
                        <RiExpandLeftLine className='size-7' />
                    </div>
                ) : (
                    <div className='text-[#FF7A00] cursor-pointer' onClick={() => setExpanded(true)}>
                        <RiExpandRightLine className='size-7' />
                    </div>
                )
            }
        </div>
        <Link to='/admin/dashboard/create' className='w-full'>
            <div 
                className={`flex flex-col gap-3 ${expanded ? "justify-start p-2 px-1" : "justify-center p-2"} cursor-pointer items-center border border-[#FF7A00] rounded-xl ${selected === 'create' ? 'bg-[#FF7A00] text-white' : 'text-[#FF7A00]'}`}
                onClick={() => setSelected('create')}    
            >
                <div>
                    <AiOutlinePlus className='size-6 font-bold' />
                </div>
                {expanded && <span className='text-sm'>Create an election</span>}
            </div>
        </Link>
        <Link to='/admin/dashboard'>
            <div 
                className={`flex gap-3 ${expanded ? "justify-start" : "justify-center"} cursor-pointer items-center border border-[#FF7A00] rounded-xl p-2 ${selected === 'home' ? 'bg-[#FF7A00] text-white' : 'text-[#FF7A00]'}`}
                onClick={() => setSelected('home')}    
            >
            <div>
                <RiHomeLine className='size-6' />
            </div>
            {expanded && <span className='text-sm'>Home</span>}
            </div>
        </Link>
        <Link to='/admin/dashboard/history'>
            <div 
                className={`flex gap-3 ${expanded ? "justify-start" : "justify-center"} cursor-pointer items-center border border-[#FF7A00] rounded-xl p-2 ${selected === 'history' ? 'bg-[#FF7A00] text-white' : 'text-[#FF7A00]'}`}
                onClick={() => setSelected('history')}    
            >
            <div>
                <AiOutlineHistory className='size-6' />
            </div>
            {expanded && <span className='text-sm'>History</span>}
        </div>
        </Link>
    </div>
  )
}

export default SideBar