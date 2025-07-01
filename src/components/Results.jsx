import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { electionService } from '../services/api'
import config from '../config/config'
import Spinner from './Spinner'

const Results = ({ pollInterval = config.DEFAULT_RESULTS_POLL_INTERVAL }) => {
    const [liveResults, setLiveResults] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const { electionId } = useParams()

    useEffect(() => {
    let cancelled = false;

    const fetchResults = async (showLoading = false) => {
        if (!electionId) {
            setError('Election ID is required');
            setIsLoading(false);
            return;
        }

        if (showLoading) setIsLoading(true);

        try {
            const response = await electionService.getElectionDetails(electionId);
            if (!cancelled) {
                setLiveResults(response.data.election.posts);
                setError('');
            }
        } catch (err) {
            if (!cancelled) {
                setError(err.response?.data?.message || 'Failed to fetch results');
            }
        } finally {
            if (!cancelled && showLoading) {
                setIsLoading(false);
            }
        }
    };

    // Initial fetch with loading spinner
    fetchResults(true);

    // Polling without spinner
    const interval = setInterval(() => fetchResults(false), pollInterval);

    return () => {
        cancelled = true;
        clearInterval(interval);
    };
}, [electionId, pollInterval]);

    if (isLoading) {
        return <Spinner />
    }

    if (error) {
        return <div className="text-red-500">{error}</div>
    }

    if (!liveResults || liveResults.length === 0) {
        return <div>No results available yet</div>
    }

    return (
        <div>
            <div className='hidden p-2 rounded-2xl mb-4 lg:grid lg:grid-cols-3 lg:gap-10'>
                {/* This section is for displaying the possible winners and their post */}
                <div className='bg-[#FFF3D3] p-2 rounded-2xl lg:col-span-2'>
                    <div className='flex justify-between items-center mb-2'>
                        <h1 className='text-[#823A0C] font-medium text-xl mb-2'>Post</h1>
                        <p className='text-[#CC5802] font-medium text-md'>Possible Winner</p>
                    </div>
                    {
                        liveResults.map((post) => {
                            // Create array of candidates with their votes
                            const candidatesWithVotes = post.candidateInfo.map((candidate, index) => ({
                                ...candidate,
                                votes: Number(post.results[index])
                            }));

                            // Sort by votes in descending order
                            const sortedCandidates = candidatesWithVotes.sort((a, b) => b.votes - a.votes);

                            // Get the candidate with the highest votes
                            const winner = sortedCandidates[0];

                            return (
                                <div key={post._id} className='flex justify-between items-center mb-2'>
                                    <p className='text-[#CC5802] font-medium text-md'>{post.title}</p>
                                    <p className='text-[#CC5802] font-medium text-md'>{winner.name}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='bg-[#FFF3D3] p-2 rounded-2xl'>
                    {/* Winner votes and their percentages of the totla vote */}
                    <div className='flex justify-between items-center mb-2'>
                        <h1 className='text-[#823A0C] font-medium text-xl mb-2'>Winner Votes</h1>
                        <p className='text-[#CC5802] font-medium text-md'>Percentage</p>
                    </div>
                    {
                        liveResults.map((post) => {
                            // Create array of candidates with their votes
                            const candidatesWithVotes = post.candidateInfo.map((candidate, index) => ({
                                ...candidate,
                                votes: Number(post.results[index])
                            }));

                            // Sort by votes in descending order
                            const sortedCandidates = candidatesWithVotes.sort((a, b) => b.votes - a.votes);

                            // Get the candidate with the highest votes
                            const winner = sortedCandidates[0];
                            const totalVotes = post.results.reduce((acc, curr) => acc + Number(curr), 0);
                            const percentage = totalVotes > 0 ? ((winner.votes / totalVotes) * 100).toFixed(2) : 0;

                            return (
                                <div key={post._id} className='flex justify-between items-center mb-2'>
                                    <p className='text-[#CC5802] font-medium text-md'>{winner.votes}</p>
                                    <p className='text-[#CC5802] font-medium text-md'>{percentage}%</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <h2 className='font-medium mb-4 px-2'>All Results</h2>
            <div className='lg:grid lg:grid-cols-3 lg:gap-8'>
                {liveResults.map((post) => {
                    // Create array of candidates with their votes
                    const candidatesWithVotes = post.candidateInfo.map((candidate, index) => ({
                        ...candidate,
                        votes: Number(post.results[index])
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
                })}
            </div>
        </div>
    )
}

export default Results