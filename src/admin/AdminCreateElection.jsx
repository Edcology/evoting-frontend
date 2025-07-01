import React, { useState } from 'react'
import axios from 'axios'
import { BsPaperclip } from 'react-icons/bs';
import { adminService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AdminCreateElection = () => {
    const [fileInputKey, setFileInputKey] = useState(0);
    const [electionData, setElectionData] = useState({
        title: "",
        posts: [],
        duration: ''
    });
    const [candidate, setCandidate] = useState({
        name: "",
        imageUrl: null
    });
    const [post, setPost] = useState({
        title: "",
        candidates: []
    });
    const [isUploading, setIsUploading] = useState(false); 
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleCandidate = async (e) => {
        e.preventDefault();
        if (!candidate.name || !candidate.imageUrl) {
            alert('Please provide both a name and an image for the candidate.');
            return;
        }
        setIsUploading(true); // Start loading

        let imageUrl = candidate.imageUrl;

        // Only upload if it's a File object (not already a URL)
        if (candidate.imageUrl && typeof candidate.imageUrl !== 'string') {
            const formData = new FormData();
            formData.append('file', candidate.imageUrl);
            formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

            try {
                const response = await axios.post(
                    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                    formData
                );
                imageUrl = response.data.secure_url; // Cloudinary returns the image URL here
            } catch (error) {
                alert('Image upload failed: ' + error.message);
                setIsUploading(false);
                return;
            }
        }

        setPost(prev => ({
            ...prev,
            candidates: [...prev.candidates, { ...candidate, imageUrl: imageUrl }]
        }));
        setCandidate({
            name: "",
            imageUrl: null
        });
        setFileInputKey(prev => prev + 1);
        setIsUploading(false); // Stop loading
    };

    const handlePost = (e) => {
        e.preventDefault();
        if (!post.title || post.candidates.length === 0) {
            alert('Please provide a title and at least one candidate for the post.');
            return;
        }
        setElectionData(prev => ({
            ...prev,
            posts: [...prev.posts, post]
        }));
        setPost({
            title: "",
            candidates: []
        });
        console.log(electionData);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log(electionData);
        if (!electionData.title || electionData.posts.length === 0 || !electionData.duration) {
            setError('Please fill in all fields before submitting.');
            setIsLoading(false);
            return;
        }
        try {
            await adminService.initializeElection(electionData);
            setSuccess(true);
        } catch (err) {
            const message = err.response?.data?.message || 'Login failed';
            setError(message);
        } finally {
            setIsLoading(false);
            navigate(`/admin/dashboard/`);
        }
    }

    if (error) {
      return <div className="text-red-500">{error}</div>
    }

    if (success) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Election Created Successfully!</h2>
          <p className="text-lg text-gray-700">Redirecting to dashboard...</p>
        </div>
      );
    }

    return (
        <div className='px-4'>
            <h2 className='text-xl font-medium mb-4'>Create an Election</h2>
            <div>
                <form onSubmit={handleSubmit} className='grid gap-4'>
                    <div className='grid gap-4'>
                        <label htmlFor="" className='bg-[#FFFAEC] grid gap-2 p-4 rounded-xl text-sm text-[#454545]'>Election Name
                        <input 
                            type="text" 
                            value={electionData.title}
                            onChange={(e) => setElectionData({...electionData, title: e.target.value})}
                            placeholder='Untitled Election' 
                            className='border-b-1 border-b-[#454545] text-2xl focus:outline-none font-medium placeholder:text-[#6D6D6D]' />
                        </label>
                        <label htmlFor="" className='bg-[#FFFAEC] grid gap-2 p-4 rounded-xl text-sm text-[#454545]'>Election Duration
                        <input 
                            type="number"
                            value={electionData.duration}
                            onChange={(e) => setElectionData({
                                ...electionData,
                                duration: Number(e.target.value)
                            })}
                            placeholder='Election Duration'
                            className='border-b-1 border-b-[#454545] text-2xl focus:outline-none font-medium placeholder:text-[#6D6D6D]' 
                        />
                        </label>
                        <div className=''>
                            <label className='bg-[#FFFAEC] grid gap-2 p-4 rounded-xl text-sm text-[#454545]' htmlFor="">Post
                                <input 
                                    type="text"
                                    value={post.title}
                                    onChange={(e) => setPost({...post, title: e.target.value})} 
                                    placeholder='Untitled Post'
                                    className='border-b-1 border-b-[#454545] text-2xl focus:outline-none font-medium placeholder:text-[#4b4a4a]'
                                    />
                            </label>
                            <label className='bg-[#FFFAEC] grid gap-2 p-4 rounded-xl text-sm text-[#454545]' htmlFor="">Candidates
                                <div className={`bg-[#9c9c9c] text-white ${post.candidates.length > 0 ? 'block' : 'hidden'} p-2 rounded-lg text-lg`}>
                                    <div className='flex gap-4 items-center'>
                                        <p className='font-medium'>Candidates</p>
                                        <p className='font-medium'>Image Url</p>
                                    </div>
                                    {
                                        post.candidates.length > 0 && (
                                            post.candidates.map((candidate, index) => (
                                                <div key={index} className='flex gap-4 items-center'>
                                                    <p>{candidate.name}</p>
                                                    <p>{candidate.imageUrl}</p>
                                                </div>
                                            ))
                                        )
                                    }
                                </div>
                                <div className='flex gap-4'>
                                    <input 
                                    type="text"
                                    value={candidate.name} 
                                    onChange={(e) => setCandidate({...candidate, name: e.target.value})}
                                    placeholder='Candidate Name'
                                    className='border-b-1 border-b-[#454545] text-2xl focus:outline-none font-medium placeholder:text-[#6D6D6D]'
                                    />
                                    <div>
                                        <input 
                                            key={fileInputKey}
                                            onChange={(e) => setCandidate({...candidate, imageUrl: e.target.files[0]})}
                                            type="file" id="candidate-image"
                                            disabled={isUploading}
                                            className='text-2xl hidden focus:outline-none font-medium placeholder:text-[#6D6D6D]'
                                        />
                                        <label htmlFor="candidate-image" 
                                            className='flex items-center gap-2 bg-orange-500 text-white font-semibold px-2 py-2 rounded-xl cursor-pointer hover:bg-orange-600 transition"'>
                                            <BsPaperclip size={18} /> Upload Image
                                        </label>
                                    </div>
                                </div> 
                                <button
                                    type='button'
                                    onClick={handleCandidate}
                                    className='border text-center rounded-lg p-1 py-2 mt-3 cursor-pointer flex items-center justify-center min-w-[120px]'
                                    disabled={isUploading}
                                >
                                    {isUploading ? (
                                        <svg className="animate-spin h-5 w-5 mr-2 text-[#FF7A00]" viewBox="0 0 24 24">
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                fill="none"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                    ) : null}
                                    {isUploading ? "Uploading..." : "Add Contestant"}
                                </button>
                            </label>
                        </div>
                    </div>
                    <button disabled={isUploading} type='button' onClick={(e) => handlePost(e)} className={`bg-[#FFFAEC] text-center rounded-lg p-1 py-2 mt-3 cursor-pointer`}>Add Post</button>
                    <button
                      className='bg-[#FF7A00] text-center text-white text-lg font-medium mb-4 rounded-lg p-1 py-2 mt-3 cursor-pointer flex items-center justify-center min-w-[150px]'
                      type='submit'
                      disabled={isUploading || isLoading}
                    >
                      {isLoading ? (
                        <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : null}
                      {isLoading ? "Creating..." : "Create Election"}
                    </button>
                </form>
            </div>
            {electionData.posts.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold text-lg mb-2">Posts to be created:</h3>
                  {electionData.posts.map((p, idx) => (
                    <div key={idx} className="mb-2 p-2 bg-[#FFF3D3] rounded">
                      <div className="font-medium">{p.title}</div>
                      <ul className="ml-4 list-disc">
                        {p.candidates.map((c, i) => (
                          <li key={i}>{c.name}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
            )}
        </div>
      )
}

export default AdminCreateElection