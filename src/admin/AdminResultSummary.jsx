import React, { useEffect, useState } from 'react'
import { electionService, adminService } from '../services/api'
import { useNavigate, useParams } from 'react-router-dom'
import { LuSquareSquare } from 'react-icons/lu'
import Spinner from '../components/Spinner'
import Results from '../components/Results'
import config from '../config/config'

const AdminResultSummary = () => {
    const [election, setElection] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { electionId } = useParams()
    const [clicked, setClicked] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
      const fetchElectionDetails = async () => {
        try {
          const response = await electionService.getElectionDetails(electionId)
          console.log(response.data.election)
          setElection(response.data.election)
        } catch (err) {
          const message = err.response?.data?.message || 'Failed to fetch election details'
          setError(message)
        } finally {
          setIsLoading(false)
        }
      }

      fetchElectionDetails()
    }, [electionId])

    if (isLoading) {
      return <Spinner />
    }

    if (error) {
      return <div className="text-red-500">{error}</div>
    }
    const handleClick = async () => {
        setLoading(true)
        try {
            adminService.closeElection(electionId)
        }catch (err) {
            setLoading(false)
            setClicked(false)
            const message = err.response?.data?.message || 'Login failed'
            setError(message)
        } finally {
            setIsLoading(false)
            setLoading(false)
            setClicked(false)
            navigate('/admin/dashboard')
        }
    }
  return (
    <div className='px-4'>
        <div className='bg-[#FFFAEC] px-4 rounded-2xl py-4'> 
            <p className='font-medium text-xl mb-4'>2025/2026 SUG ELECTION</p>
            <div className='flex justify-between'>
                <div className='flex justify-center items-center gap-2'>
                    <p className='font-medium'>Election Ended</p>
                </div>
                <div onClick={() => setClicked(true)} className='flex justify-center items-center gap-3 text-[#FF7A00] border border-[#FF7A00] p-1 rounded-lg cursor-pointer transition-colors'>
                    <LuSquareSquare />
                    <p>Close Election</p>
                </div>
            </div>
            <div className='mt-4'>
                <div>
                    <Results electionId={electionId} pollInterval={config.RESULTS_POLL_INTERVAL} />
                </div>
            </div>
        </div>
        {
            clicked && (
                <div className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/10 backdrop-blur-sm'>
                    <div className='bg-white p-10 py-8 rounded-xl text-center'>
                        <h2 className='text-[#FF7A00] font-medium mb-2'>Do you want to close this Election?</h2>
                        <p className='mb-6 text-sm'>Your actions are irreversible</p>
                        <div className='flex justify-between gap-8'>
                            <button onClick={() => setClicked(false)} className='text-[#FF7A00] cursor-pointer border border-[#FF7A00] p-1 rounded-xl px-12'>Cancel</button>
                            <button disabled={loading} onClick={handleClick} className='text-white bg-[#FF7A00] rounded-xl p-1 px-4 cursor-pointer'>
                                {loading ? (
                                    <svg className="animate-spin h-5 w-5 justify-self-center" viewBox="0 0 24 24">
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                ): "Close Election"}
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default AdminResultSummary