import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Nav from '../components/Nav'
import Results from '../components/Results'
import { electionService } from '../services/api'
import Spinner from '../components/Spinner'
import config from '../config/config'

const ElectionResults = () => {
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const { electionId } = useParams()

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await electionService.getElectionDetails(electionId);
                setResults(response.data.election.posts);
            } catch (err) {
                const message = err.response?.data?.message || 'Failed to fetch results';
                setError(message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [electionId]);

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='px-4'>
            <Nav />
            <div className='w-full p-2 mt-2 bg-[#DCEDFF] text-center text-[#507CFF] rounded-2xl'>
                <h1 className='font-medium text-xl'>2025/2026 SUG Election</h1>
            </div>
            <div>
                <h1 className='text-[#461B04] font-medium text-2xl mb-2 mt-6'>Election Results</h1>
                <p className='text-[#FF7A00] mb-6 text-sm font-medium'>Your vote. Your voice, here’s how the majority decided</p>
            </div>
            <div className='mb-2'>
                <h1 className='text-[#461B04] font-medium text-xl mb-6'>Summary</h1>
                <div className='mb-4 bg-[#FFF3D3] rounded-2xl p-3'>
                    <div className='flex justify-between items-center mb-2'>
                        <h1 className='text-[#823A0C] font-medium text-xl'>Winner</h1>
                        <h1 className='text-[#823A0C] font-medium text-xl'>Post</h1>
                    </div>
                    {results && results.map((result, index) => {
                        const votes = result.results.map(vote => Number(vote));
                        const highestVote = Math.max(...votes);
                        const winnerIndex = votes.findIndex(vote => vote === highestVote);
                        return (
                            <div key={index} className='flex justify-between items-center mb-2'>
                                <p className='text-[#CC5802] font-bold text-lg'>{result.candidates[winnerIndex]}</p>
                                <p className='text-[#CC5802] font-medium text-md'>{result.title}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div>
                <h1 className='text-[#461B04] font-medium text-xl mb-6'>All Results</h1>
                <Results electionId={electionId} pollInterval={config.DEFAULT_RESULTS_POLL_INTERVAL} />
            </div>
        </div>
    )
}

export default ElectionResults