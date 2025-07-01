import React, { useEffect, useState } from 'react'
import Results from '../components/Results'
import CountDownTimer from '../components/CountDownTimer'
import Nav from '../components/Nav'
import { useParams } from 'react-router-dom'
import { electionService } from '../services/api'
import config from '../config/config'
import Spinner from '../components/Spinner'

const LiveResult = () => {
  const [election, setElection] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const { electionId } = useParams()

  useEffect(() => {
    const fetchElectionDetails = async () => {
      try {
        const response = await electionService.getElectionDetails(electionId)
        setElection(response.data.election)
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to fetch election details'
        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchElectionDetails()
    // Poll for updates using configured interval
    const interval = setInterval(fetchElectionDetails, config.DEFAULT_RESULTS_POLL_INTERVAL)
    return () => clearInterval(interval)
  }, [electionId])

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className='px-4'>
      <Nav />
      <div className='w-full p-2 mt-2 bg-[#DCEDFF] text-center text-[#507CFF] rounded-2xl'>
        <h1 className='font-medium text-xl'>{election?.title || '2025/2026 SUG Election'}</h1>
      </div>
      <div className='text-center mt-4 flex flex-col gap-2 justify-center items-center mb-6'>
        <p>Election ends in</p>
        <CountDownTimer colour='orange' election={election} duration={election?.duration} electionId={electionId} />
      </div>
      <div>
        <Results electionId={electionId} pollInterval={config.DEFAULT_RESULTS_POLL_INTERVAL} />
      </div>
    </div>
  )
}

export default LiveResult