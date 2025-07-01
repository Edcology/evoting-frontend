import React, { useEffect, useState } from 'react'
import ActiveElection from './ActiveElection'
import NoActiveElection from './NoActiveElection'
import { electionService } from '../services/api'

const Election = () => {
    const [active, setActive] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await electionService.getActiveElections()
                console.log(response)
                setActive(response.data.totalActive > 0)
            } catch (err) {
                console.error(err)
                setActive(false)
            }
        }
        fetchData()
    }, [])

    return (
        <>
            {active ? <ActiveElection /> : <NoActiveElection />}
        </>
    )
}

export default Election