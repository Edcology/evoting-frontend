import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CountDownTimer = ({ colour, duration, electionId, election }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })
    const navigate = useNavigate()
    
    const styles = {
        blue: {
            background: '#C0DCFF',
            color: '#3152FA'
        },
        gray: {
            background: '#D1D1D1',
            color: '#3D3D3D'
        },
        orange: {
            background: '#FFF3D3',
            color: '#FF920A'
        },
        white: {
            background: 'transparent',
            color: '#3152FA'
        }
    }

    useEffect(() => {
        if (!duration) return

        const startTime = Date.parse(election.startDate) || new Date()
        const endTime = startTime + (duration * 3600 * 1000)

        const calculateTimeLeft = () => {
            const now = new Date()
            const difference = endTime - now

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24))
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
                const seconds = Math.floor((difference % (1000 * 60)) / 1000)
                
                setTimeLeft({ days, hours, minutes, seconds })
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
            }
        }

        calculateTimeLeft() // Initial calculation
        const interval = setInterval(calculateTimeLeft, 1000)
        return () => clearInterval(interval)
    }, [duration, electionId, navigate, election.startDate])

    const formatTime = (value) => {
        return value.toString().padStart(2, '0')
    }

    const showDays = timeLeft.days > 0
    const style = styles[colour] || styles.blue

    return (
        <div>
            {showDays ? (
                <div className='flex gap-2 items-center'>
                    <div className="font-bold p-[6px] rounded-xl" style={{ backgroundColor: style.background }}>
                        <p className={`${colour === 'orange' ? 'text-xl font-medium' : ''}`} style={{ color: style.color }}>
                            {formatTime(timeLeft.days)}<span>D</span>
                        </p>
                    </div>
                    <div>:</div>
                    <div className="font-bold p-[6px] rounded-xl" style={{ backgroundColor: style.background }}>
                        <p className={`${colour === 'orange' ? 'text-xl font-medium' : ''}`} style={{ color: style.color }}>
                            {formatTime(timeLeft.hours)}<span>H</span>
                        </p>
                    </div>
                    <div>:</div>
                    <div className="font-bold p-[6px] rounded-xl" style={{ backgroundColor: style.background }}>
                        <p className={`${colour === 'orange' ? 'text-xl font-medium' : ''}`} style={{ color: style.color }}>
                            {formatTime(timeLeft.minutes)}<span>M</span>
                        </p>
                    </div>
                </div>
            ) : (
                <div className='flex gap-2 items-center'>
                    <div className="font-bold p-[6px] rounded-xl" style={{ backgroundColor: style.background }}>
                        <p className={`${colour === 'orange' ? 'text-xl font-medium' : ''}`} style={{ color: style.color }}>
                            {formatTime(timeLeft.hours)}<span>H</span>
                        </p>
                    </div>
                    <div>:</div>
                    <div className="font-bold p-[6px] rounded-xl" style={{ backgroundColor: style.background }}>
                        <p className={`${colour === 'orange' ? 'text-xl font-medium' : ''}`} style={{ color: style.color }}>
                            {formatTime(timeLeft.minutes)}<span>M</span>
                        </p>
                    </div>
                    <div>:</div>
                    <div className="font-bold p-[6px] rounded-xl" style={{ backgroundColor: style.background }}>
                        <p className={`${colour === 'orange' ? 'text-xl font-medium' : ''}`} style={{ color: style.color }}>
                            {formatTime(timeLeft.seconds)}<span>S</span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CountDownTimer