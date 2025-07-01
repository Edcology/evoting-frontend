import React from 'react'
import end from '../assets/end.png'
import { Link, useLocation } from 'react-router-dom'

const ElectionEnd = () => {
    const location = useLocation()
    const { electionId } = location.state || {}

    return (
        <div className='bg-[#FFF3D3] flex flex-col items-center h-screen justify-center px-4'>
            <div className='bg-[#FFE3A5] p-5 rounded-full items-center justify-center mb-4'>
                <img src={end} alt="Election End" />
            </div>
            <h1 className='text-xl font-medium mb-2'>Election ended</h1>
            <p className='text-sm mb-10 text-center'>
                We are sorry about the Election ending during your participation, your votes were successfully registered, 
                thanks for participating, your vote matters...
            </p>
            <div className='fixed bottom-2 flex gap-4 w-full px-4'>
                <Link 
                    className='flex-1' 
                    to={`/vote-summary/${electionId}`}
                >
                    <button className='border border-[#FF7A00] p-4 py-3 rounded-xl text-[#FF7A00] w-full font-medium'>
                        Vote Summary
                    </button>
                </Link>
                <Link 
                    className='flex-1' 
                    to={`/election-results/${electionId}`}
                >
                    <button className='p-4 py-3 rounded-xl text-white bg-[#FF7A00] w-full font-medium'>
                        Election Results
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default ElectionEnd