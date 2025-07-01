import React, { useEffect, useState } from 'react'
import { adminService } from '../services/api'
import { RiDeleteBinLine } from 'react-icons/ri'
import { CiPlay1 } from 'react-icons/ci'
import AdminElectionCard from './AdminElectionCard'
import { MdCancelPresentation } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const AdminElection = () => {
    const [elections, setElections] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [clicked, setClicked] = useState(false)
    const [start, setStart] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
        
    useEffect(() => {
        const fetchActiveElections = async () => {
            try {
                const response = await adminService.getInitializedElections();
                setElections(response.data.elections);
            } catch (err) {
                const message = err.response?.data?.message || 'Failed to fetch elections';
                setError(message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchActiveElections();
    }, );

    const handleClick = async () => {
        setLoading(true);
        try {
            await adminService.startElection(elections[0].id);
            setStart(false);
            navigate(`/admin/dashboard/${elections[0].id}`)
        } catch (err) {
            setLoading(false);
            setStart(false);
            const message = err.response?.data?.message || 'Failed to start election';
            setError(message);
        } finally {
            setIsLoading(false);
        }
    }
  return (
    <div>
       { isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className='text-red-500'>{error}</p>
                ) : (
                    <div className='mt-4'>
                        {elections.map((election) => (
                          <AdminElectionCard election={election} setClicked={setClicked} setStart={setStart} />  
                        ))}
                    </div>
        )}
        {
            clicked && (
                <div className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/10 backdrop-blur-sm'>
                    <div className='bg-white p-10 py-8 rounded-xl text-center'>
                        <h2 className='text-[#FF7A00] font-medium mb-2'>Do you want to delete this Election?</h2>
                        <p className='mb-6 text-sm'>Your actions are irreversible</p>
                        <div className='flex justify-between gap-8'>
                            <button onClick={() => setClicked(false)} className='text-[#FF7A00] cursor-pointer border border-[#FF7A00] p-1 rounded-xl px-12'>Cancel</button>
                            <button className='text-white bg-[#FF7A00] rounded-xl p-1 px-4'>Delete Election</button>
                        </div>
                    </div>
                </div>
            )
        }
        {
            start && (
                <div className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/10 backdrop-blur-sm'>
                    <div className='bg-white p-10 py-8 rounded-xl text-center'>
                        <h2 className='text-[#FF7A00] font-medium mb-2 text-xl'>Start an Election</h2>
                        <p className='mb-6 text-sm'>Your actions are irreversible</p>
                        <div className='flex justify-between gap-8'>
                            <button onClick={() => setStart(false)} className='text-[#FF7A00] cursor-pointer border border-[#FF7A00] p-1 rounded-xl px-8'>
                                <div className='flex items-center gap-2'>
                                    <MdCancelPresentation className='size-6' /> Cancel
                                </div>
                            </button>
                            <button disabled={loading} onClick={handleClick}  className='text-white bg-[#FF7A00] rounded-xl p-2 px-4 w-32 cursor-pointer'>
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
                                ): (
                                    <div className='flex items-center gap-3'>
                                        <CiPlay1 className='size-6' />
                                        Start
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default AdminElection