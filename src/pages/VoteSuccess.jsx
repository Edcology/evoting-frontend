import React, { useEffect, useState } from 'react'
import success from '../assets/success.png'
import { Link, useLocation } from 'react-router-dom'
import { electionService } from '../services/api'

const VoteSuccess = () => {
    const location = useLocation()
    const { electionId, currentPostId, index } = location.state || {}
    const [nextPost, setNextPost] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchNextPost = async () => {
            if (!electionId || !currentPostId) return
            
            try {
                const response = await electionService.getElectionDetails(electionId)
                const posts = response.data.election.posts
                const currentIndex = posts.findIndex(post => post._id === currentPostId)
                
                if (currentIndex < posts.length - 1) {
                    setNextPost(posts[currentIndex + 1])
                }
            } catch (err) {
                const message = err.response?.data?.message || 'Failed to fetch next post'
                setError(message)
            } finally {
                setIsLoading(false)
            }
        }

        fetchNextPost()
    }, [electionId, currentPostId])

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-[#FFF3D3]'>
            <div>
                <div className='flex flex-col items-center'>
                    <div>
                        <img src={success} alt="Vote Success" />
                    </div>
                    <h2 className='font-medium text-xl mb-2 text-[#A1440B]'>Your vote has been registered</h2>
                    <p className='text-sm text-center mb-8 text-[#461B04]'>
                        Thanks for participating, your vote matters
                    </p>
                </div>
            </div>
            <div className='fixed bottom-2 flex gap-4 w-full px-4'>
                <Link 
                    className='flex-1' 
                    to={`/election/${electionId}`}
                >
                    <button className='border border-[#FF7A00] p-4 py-3 rounded-xl text-[#FF7A00] w-full font-medium hover:bg-[#FF7A00] hover:text-white transition-colors'>
                        Dashboard
                    </button>
                </Link>
                {!isLoading && nextPost ? (
                    <Link 
                        className='flex-1' 
                        to={`/vote/${nextPost._id}`}
                        state={
                            { 
                                candidates: nextPost.candidateInfo,
                                postName: nextPost.title,
                                index: index + 1,
                                electionId: electionId,
                                postId: nextPost._id
                            }
                        }
                    >
                        <button className='p-4 py-3 rounded-xl text-white bg-[#FF7A00] w-full font-medium hover:opacity-90 transition-opacity'>
                            Vote for Next Post
                        </button>
                    </Link>
                ) : (
                    <Link 
                        className='flex-1' 
                        to={`/live-result/${electionId}`}
                    >
                        <button className='p-4 py-3 rounded-xl text-white bg-[#FF7A00] w-full font-medium hover:opacity-90 transition-opacity'>
                            View Live Results
                        </button>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default VoteSuccess