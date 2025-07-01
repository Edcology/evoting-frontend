import { CiPlay1 } from 'react-icons/ci';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const AdminElectionCard = ({election, setClicked, setStart}) => {
    const totalContestants = election.posts.reduce((total, post) => total + post.candidateCount, 0);
    const navigate = useNavigate()
    const handleClick = () => {
        if (election?.status === 'ended') {
          navigate(`/election-results/?${election.id}`)
        } else {
          navigate(`/admin/dashboard/${election.id}`)
        }
    }
  return (
        <div className='p-4 bg-[#FFFAEC] rounded-lg mb-4 cursor-pointer'>
            <div onClick={handleClick}>
                <h2 className='text-xl font-semibold text-[#3D3D3D] mb-4'>{election.title}</h2>
                <p className='font-medium text-[#3D3D3D] mb-1'>Number of posts: <span>{election.posts.length}</span></p>
                <p className='font-medium text-[#3D3D3D]'>Total Contestants: <span>{totalContestants}</span></p>
            </div>
            <div className={`gap-4 mt-4 ${election.isActive ? 'hidden' : 'flex'}`}>
                <button onClick={() => setClicked(true)} className='flex gap-2 items-center cursor-pointer justify-center border border-[#3D3D3D] text-[#3D3D3D] font-medium p-2 py-1 rounded-lg'>
                    <RiDeleteBinLine className='size-5' /> Delete Election
                </button>
                <button onClick={() => setStart(true)} className='flex gap-2 items-center justify-center cursor-pointer bg-[#FF7A00] text-white font-medium p-2 py-1 rounded-lg'>
                    <CiPlay1 className='size-5' /> Start Election
                </button>
            </div>
        </div>
  )
}

export default AdminElectionCard