import React, { useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import Nav from '../components/Nav'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import { electionService } from '../services/api'

const Vote = () => {
    const location = useLocation()
    const { candidates, postName, index, electionId } = location.state || { candidates: [] }
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    const { postId } = useParams()
    const navigate = useNavigate()

    const next = () => {
      setCurrentIndex((prev) => (prev + 1) % candidates.length)
    }

    const prev = () => {
      setCurrentIndex((prev) =>
        prev === 0 ? candidates.length - 1 : prev - 1
      )
    }

    const current = candidates[currentIndex]

    const handleVoteSubmit = async () => {
        setIsSubmitting(true)
        setError('')

        try {
            await electionService.vote({
              electionId: electionId,
              postIndex: index,
              candidateIndex: currentIndex
            })
            navigate('/vote-success', {state: { electionId: electionId, currentPostId: postId, index: index }})
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to submit vote'
            setError(message)
        } finally {
            setIsSubmitting(false)
        }
    }

  return (
    <div className='bg-[#FFF3D3] h-screen px-4 lg:w-md lg:mx-auto'>
        <Nav />
        <div className='flex items-center justify-center gap-2'>
            {candidates.map((_, index) => (
                <div 
                    key={index} 
                    className={`w-6 h-1 rounded-full bg-[#823A0C] ${
                        index === currentIndex ? "w-12" : "bg-[#FFAD32]"
                    }`}
                />
            ))}
        </div>
        <div className='flex flex-col items-center justify-center pt-4 w-4xs h-[400px] rounded-2xl mb-4'>
            <img src={current?.imageUrl} 
              alt={current?.name} className='w-4xs h-[400px]' />
        </div>
        <div className='text-center mb-2'>
            <p className='text-[#461B04] font-medium'>Vote</p>
            <p className='text-[#A1440B] font-semibold text-2xl'>{current?.name}</p>
            <p className='text-[#461B04] font-medium'>as</p> 
            <p className='text-[#A1440B] font-medium text-xl'>{postName}</p>
        </div>
        <div className='flex gap-4 items-center justify-center'>
            <button 
                onClick={prev} 
                className='border border-[#FF7A00] p-4 py-3 rounded-xl text-[#FF7A00]'
            >
                <GrFormPrevious />
            </button>
            <button 
                onClick={handleVoteSubmit} 
                disabled={isSubmitting || !current} 
                className='bg-[#FF7A00] p-3 w-52 rounded-xl text-white disabled:opacity-50'
            >
                {isSubmitting ? 'Submitting...' : 'Vote'}
            </button>
            <button 
                onClick={next} 
                className='border border-[#FF7A00] p-4 py-3 rounded-xl text-[#FF7A00]'
            >
                <GrFormNext />
            </button>
        </div>
        {error && <p className='text-red-500 text-center mt-4'>{error}</p>}
    </div>
  )
}

export default Vote