import React from 'react'
import { FaRegUser } from 'react-icons/fa'

const SummaryCard = ({name, role}) => {
  return (
    <div className='flex gap-4 w-full rounded-2xl bg-[#FFF3D3] p-3'>
        <div className='bg-[#FFCE6D] text-[#CC5802] p-3 rounded-full flex items-center justify-center'>
            <FaRegUser className='size-7' />
        </div>
        <div>
            <h3 className='text-[#CC5802] font-medium text-xl'>{name}</h3>
            <p className='text-[#823A0C] font-medium'>{role}</p>
        </div>
    </div>
  )
}

export default SummaryCard