import React, { useEffect, useState } from 'react'
import ActiveElection from '../pages/ActiveElection'
import NoActiveElection from '../pages/NoActiveElection'
import { adminService } from '../services/api'
import AdminActiveElection from './AdminActiveElection'
import AdminElection from './AdminElection'

const AdminElectionPage = () => {
    const [active, setActive] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await adminService.getInitializedElections()
                console.log(response)
                setActive(response.data.totalUnstarted > 0)
            } catch (err) {
                console.error(err)
                setActive(false)
            }
        }
        fetchData()
    }, [])

    return (
        <div className='px-4'>
            {active ? <AdminElection /> : <NoActiveElection />}
        </div >
    )
}

export default AdminElectionPage