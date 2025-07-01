import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaRegUser } from 'react-icons/fa'

const PostCard = ({postName, noOfContestants, candidates, postId, index, electionId, isVoted}) => {
    const navigate = useNavigate()

    const handleVoteClick = () => {
        navigate(`/vote/${postId}`, { state: { candidates, postName, index, electionId, postId } })
    }

    return (
        <div className='flex justify-between items-center bg-[#FFF3D3] text-[#3D3D3D] font-medium rounded-2xl p-4 py-3 gap-2 mb-4'>
            <div>
                <h1 className='text-xl font-medium text-[#823A0C]'>{postName}</h1>
                <div className='flex items-center gap-2 mt-2'>
                    <div className='bg-[#FFCE6D] rounded-full p-1 text-[#CC5802]'>
                        <FaRegUser className='size-3' />
                    </div>
                    <p className='text-[#CC5802] text-sm'>{noOfContestants} contestants</p>
                </div>
            </div>
            <div>
                <button 
                    onClick={handleVoteClick}
                    disabled={isVoted}
                    className={`bg-[#FF7A00] text-white font-medium py-2 px-4 rounded-2xl cursor-pointer ${isVoted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#FFAD32] transition-colors'} transition-opacity`}
                >
                    {isVoted ? 'Voted' : 'Vote'}
                </button>
            </div>
        </div>
    )
}

export default PostCard