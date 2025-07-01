import React from 'react'
import { useNavigate } from 'react-router-dom'
import CountDownTimer from './CountDownTimer'

const ElectionCard = ({ election }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (election?.status === 'ended') {
      navigate(`/election-results/?${election.id}`)
    } else {
      navigate(`/election/${election.id}`)
    }
  }

  return (
    <div 
      onClick={handleClick}
      className={`bg-[#DCEDFF] text-[#3152FA] font-medium rounded-2xl p-4 flex flex-col gap-2 cursor-pointer hover:opacity-90 transition-opacity`}
    >
      <p className='font-bold'>{election.title}</p>
      <div className='flex items-center justify-between'>
        <p className='font-medium'>Election ends in</p>
        <CountDownTimer 
          colour='blue' 
          duration={election.duration}
          electionId={election.id} 
          election={election}
        />
      </div>
    </div>
  )
}

export default ElectionCard