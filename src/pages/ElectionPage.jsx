import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Nav from '../components/Nav'
import CountDownTimer from '../components/CountDownTimer'
import PostCard from '../components/PostCard'
import { electionService } from '../services/api'
import Spinner from '../components/Spinner'

const ElectionPage = () => {
  const [election, setElection] = useState(null)
  const [voteStatus, setVoteStatus] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const { electionId } = useParams()

  useEffect(() => {
    const fetchElectionDetails = async () => {
      try {
        const [electionResponse, statusResponse] = await Promise.all([
          electionService.getElectionDetails(electionId),
          electionService.checkVoteStatus(electionId)
        ]);
        console.log(statusResponse.data.voteStatus)
        setElection(electionResponse.data.election);
        setVoteStatus(statusResponse.data.voteStatus);
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to fetch data';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchElectionDetails();
  }, [electionId]);

  if (isLoading) {
    return <Spinner />
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className='px-4 lg:w-md lg:mx-auto'>  
      <Nav />
      <div className='w-full p-2 mt-2 bg-[#DCEDFF] text-center text-[#507CFF] rounded-2xl'>
        <h1 className='font-medium text-xl'>{election?.title || '2025/2026 SUG Election'}</h1>
      </div>
      <div className='text-center mt-4 flex flex-col gap-2 justify-center items-center mb-6'>
        <p>Election ends in</p>
        <CountDownTimer colour='orange' election={election} duration={election?.duration} electionId={electionId} />
      </div>
      <div>
        <h1 className='text-[#461B04] font-medium text-xl mb-4'>Available Posts</h1>
        {election?.posts.map((post, index) => (
          <PostCard 
            key={post._id} 
            postName={post.title} 
            noOfContestants={post.candidates.length} 
            candidates={post.candidateInfo}
            postId={post._id}
            index={index}
            electionId={electionId}
            isVoted={voteStatus?.[index]?.voted ?? true}
          />
        ))}
      </div>
    </div>
  );
}

export default ElectionPage