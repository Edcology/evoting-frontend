import React from 'react'
import Nav from '../components/Nav'
import NoActiveElec from '../assets/no-active-election.png'

const NoActiveElection = () => {
  return (
    <div className='px-4 lg:w-md lg:mx-auto'>
      <div className='md:hidden'>
        <Nav />
      </div>
      <div className='flex flex-col items-center flex-auto justify-center gap-4 mt-42'>
        <div className='bg-[#FFE3A5] p-4 rounded-full flex flex-col items-center justify-center'>
          <img src={NoActiveElec} alt="No active election" />
        </div>
        <p className='text-sm'>Election season is over — stay informed, stay ready</p>
      </div>
    </div>
  )
}

export default NoActiveElection