import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import ElectionCard from '../components/ElectionCard'
import { electionService } from '../services/api'

const ActiveElection = () => {
    const [elections, setElections] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchActiveElections = async () => {
            try {
                const response = await electionService.getActiveElections();
                setElections(response.data.elections);
            } catch (err) {
                const message = err.response?.data?.message || 'Failed to fetch elections';
                setError(message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchActiveElections();
    }, []);

    return (
        <div className='lg:w-md lg:mx-auto px-4'>
            <Nav />
            <div className='px-1 mt-4'>
                <h1 className='font-medium text-xl'>Ongoing Elections</h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className='text-red-500'>{error}</p>
                ) : (
                    <div className='mt-4'>
                        {elections.map((election) => (
                            <ElectionCard key={election.id} election={election} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ActiveElection