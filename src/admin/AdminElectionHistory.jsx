import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spinner'
import { adminService } from '../services/api'
import { AiOutlineHistory } from 'react-icons/ai'

const AdminElectionHistory = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [elections, setElections] = useState([])
    const [error, setError] = useState('')
    const [index, setIndex] = useState(null)
    
    useEffect(() => {
      const fetchElectionHistory = async () => {
        try {
          const response = await adminService.getAllElections()
          console.log(response.data.elections)
          setElections(response.data.elections)
        } catch (err) {
          const message = err.response?.data?.message || 'Failed to fetch election details'
          setError(message)
        } finally {
          setIsLoading(false)
        }
      }

      fetchElectionHistory()
    }, [])

    if (isLoading) {
      return <Spinner />
    }

    if (error) {
      return <div className="text-red-500">{error}</div>
    }
  return (
    <div>
        <h1 className='px-4 font-medium text-xl'>History</h1>
        <div className='flex flex-col gap-4 p-4'>
            {
                elections.map((election, idx) => {
                    return (
                        <div className='bg-[#FFFAEC] p-4 rounded-2xl' key={election._id}>
                            <h2 className='font-medium text-lg mb-4'>{election?.title}</h2>
                            <p className='mb-2'>
                              Held on: 
                              <span className='font-medium px-1'>
                                {
                                    new Date(election.startDate)
                                      .toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
                                }
                              </span>
                            </p>
                            <p>Number of posts: <span className='font-medium mb-2'>{election?.posts.length}</span></p>
                            <p>Total Contestants: <span className='font-medium mb-2'>{election?.posts.reduce((total, post) => total + post.candidates.length, 0)}</span></p>
                            <button className='mt-4 bg-[#FF7A00] text-white py-2 px-4 rounded-xl flex gap-2 items-center cursor-pointer' onClick={() => setIndex(idx)}> <AiOutlineHistory className='size-5' />View Result</button>
                            {
                                index === idx && (
                                    <div className='mt-4 '>
                                        <div className='grid grid-cols-3 gap-8'>
                                            {election.posts.map((post) => {
                                            // Create array of candidates with their votes
                                            const candidatesWithVotes = post.candidateInfo.map((candidate, index) => ({
                                                ...candidate,
                                                votes:
                                                    post.results &&
                                                    post.results[index] &&
                                                    Array.isArray(post.results[index].words)
                                                        ? post.results[index].words[index]
                                                        : 0
                                            }));
                                        
                                            // Sort by votes in descending order
                                            const sortedCandidates = candidatesWithVotes.sort((a, b) => b.votes - a.votes);
                                        
                                            return (
                                                <div className=''>
                                                    <div key={post._id} className='mb-4 bg-[#FFF3D3] rounded-2xl p-3 w-full h-full'>
                                                        <div className='flex justify-between items-center mb-2'>
                                                            <h1 className='text-[#823A0C] font-medium text-xl'>{post.title}</h1>
                                                            <h1 className='text-[#823A0C] font-medium text-xl'>Votes</h1>
                                                        </div>
                                                            {sortedCandidates.map((candidate) => (
                                                                <div key={candidate._id || candidate.name} className='flex justify-between items-center mb-2'>
                                                                    <p className='text-[#CC5802] font-medium text-md'>{candidate.name}</p>
                                                                    <p className='text-[#CC5802] font-medium text-md'>{candidate.votes}</p>
                                                                </div>
                                                            ))}
                                                    </div>
                                                 </div>
                                            );
                                            }
                                            )}
                                        </div>
                                        <button className='mt-4 bg-[#FF7A00] text-white py-2 px-4 rounded-xl flex gap-2 items-center cursor-pointer' onClick={() => setIndex(null)}>Cancel</button>
                                    </div>
                                )
                            }
                        </div>
                    )
            })
            }
        </div>
    </div>
  )
}

export default AdminElectionHistory