'use client'
import axios from 'axios';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

import Link from 'next/link'

const Page = () => {
  const [videos, setVideos] = useState([]);

  const apiBaseUrl = 'https://fastapi-p25o.onrender.com/video';
  const router = useRouter();

  useEffect(() => {
    const getAllVideos = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/allvideos`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setVideos(response.data.videos); // Corrected: Access 'videos' property
        console.log(videos);

      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    getAllVideos();
  }, [])

  function navigate() {
    router.push('/sign-in');
  }

  return (
    <div className="flex flex-col items-center bg-[#e7ecef]">
      <div className='nav flex justify-between pt-5  pb-8 h-[10vh] w-[65vw] rounded-b-2xl'>
        <div className='text-4xl text-[#03045e] flex'>
          <img src="logo2.png" className="" />
          <h1>Beine</h1>
        </div>
        <div className='flex justify-between items-end text-[#03045e]'>
          <p className='text-2xl mr-8'>
            Learn more
          </p>
          <button className='text-2xl h-10 w-32 rounded-2xl border-2 bg-[#e7ecef] shadow-lg' onClick={navigate}>
            Sign in
          </button>
        </div>
      </div>
      <div className="flex flex-wrap w-[65vw] justify-start">
        {videos.map((video, index) => (
          <div key={index} className='bg-white rounded-lg shadow-md p-4 m-4 w-64'>
            <video src={video.video_url} controls className="w-full object-cover mb-4 rounded-md"></video>
            <h3 className="text-black text-xl font-semibold mb-2">{video.title}</h3>
          </div>
          
        ))}
      </div>
    </div>
  );
}
export default Page;
