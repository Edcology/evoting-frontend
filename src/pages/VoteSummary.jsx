import React, { useEffect, useState } from 'react'
import SummaryCard from '../components/SummaryCard'
import { Link, useParams } from 'react-router-dom'
import { electionService } from '../services/api'
import Spinner from '../components/Spinner'

const VoteSummary = () => {
    const [voteSummary, setVoteSummary] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const { electionId } = useParams()

    useEffect(() => {
        const fetchVoteSummary = async () => {
            try {
                const response = await electionService.getVoteSummary()
                const index = response.data.voteHistory.findIndex(vote => vote.electionId === electionId)
                setVoteSummary(response.data.voteHistory[index].votes)
            } catch (err) {
                const message = err.response?.data?.message || 'Failed to fetch vote summary'
                setError(message)
            } finally {
                setIsLoading(false)
            }
        }

        fetchVoteSummary()
    }, [electionId])

    if (isLoading) {
        return <Spinner />
    }

    if (error) {
        return <div className="text-red-500">{error}</div>
    }

    return (
        <div className='lg:w-md lg:mx-auto px-4 flex flex-col h-screen items-center'>
            <h1 className='mb-5 text-2xl mt-4 text-[#461B04] font-medium text-left w-full'>Vote Summary</h1>
            <div className='flex flex-col gap-4 w-full'>
                {voteSummary.map((vote) => (
                    <SummaryCard 
                        key={vote.id} 
                        name={vote.candidate.name} 
                        role={vote.postTitle} 
                    />
                ))}
            </div>
            <div className='fixed bottom-2 flex gap-4 w-full px-4'>
                <Link 
                    className='flex-1' 
                    to='/sign-in' 
                    onClick={() => localStorage.clear()}
                >
                    <button className='border border-[#FF7A00] p-4 py-3 rounded-xl text-[#FF7A00] w-full font-medium'>
                        Sign out
                    </button>
                </Link>
                <Link 
                    className='flex-1' 
                    to={`/live-result/${electionId}`}
                >
                    <button className='p-4 py-3 rounded-xl text-white bg-[#FF7A00] w-full font-medium'>
                        Live Results
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default VoteSummary