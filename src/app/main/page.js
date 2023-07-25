'use client'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import ReactPlayer from 'react-player'

import Link from 'next/link'

const Page = () => {

  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [videoUrl, setVideoUrl] = useState("https://s3-eu-central-1.amazonaws.com/zhannurkhan04/beine/64b77b2ad116ea3d61858949//tmp/tmprvf8hlqn.mp4");

  function signOut() {
    localStorage.removeItem('token');
    router.push('/');
  }

  const axios = require('axios');


  async function uploadVideo() {
    console.log("Erbo mal");
  try {
    const requestBody = {
      prompt: prompt,
    };

    // Replace 'http://your-fastapi-server/newvideo' with the URL where your FastAPI server is running
    const response = await axios.post('http://localhost:8000/video/newvideo', requestBody, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace with the JWT access token you have obtained during authentication
      },
    });

    console.log('Video generation request successful:', response.data);

    if(response.status == 200) {
      setVideoUrl(response.data.link);
    }
  } catch (error) {
    console.error('Error sending video generation request:', error.message);
  }
}

// Call the uploadVideo function to send the video generation request

  return (
    <div >
        <div className='nav flex justify-between px-20 pt-5  pb-8 border-b-2 border-b-sky-950 h-[10vh]'>
      <div className='text-5xl'>
        <h1>Beine</h1>
      </div>
      <div className='flex justify-between items-end' >
      <p className='text-2xl mr-8'>
          My videos
        </p>
        <p className='text-2xl mr-8'>
          Learn more
        </p>
        <button className='text-2xl h-10 w-32 rounded-2xl border-2 border-sky-800 shadow-lg shadow-sky-700/50' onClick={signOut}>
          Sign out
        </button>
      </div>
    </div>
    <div className="h-[80vh] flex justify-center items-center gap-52 bg-cover bg-center" style={{ backgroundImage: "url('bgGif.gif')", opacity: 0.90 }}>
        <div className="bg-black w-1/5  h-1/3 border-2 border-sky-800 rounded-2xl flex flex-col justify-center gap-6 items-center">
            <input className="bg-transparent border-2 border-sky-800 rounded-2xl w-2/3 h-1/4 p-3" placeholder="Write your topic here" onChange={e => setPrompt(e.target.value)}>
            </input>
            <button className="bg-sky-800 border-2 border-sky-800 rounded-2xl w-1/3 h-1/4" onClick={uploadVideo}>
                Submit
            </button>
        </div>

        {
          videoUrl ? (
            <div className="w-[640px]  h-[480px] border-2 border-sky-800 rounded-2xl relative">
            <video src= {videoUrl} controls className="w-full h-full rounded-2xl"></video>
            </div>
          ) : (
            <div className="w-[640px]  h-[480px] border-2 border-sky-800 rounded-2xl relative">
            <img src = "\accets\tv-static.gif" className="w-full h-full rounded-2xl opacity-30"></img>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <span className="text-white text-3xl font-semibold bg-black py-2 px-5 rounded-2xl opacity-80">Your future video will be here.</span>
            </div>
            </div>
          )

        }
        
    </div>
    <div className="px-20 pt-8  pb-5 border-t-2 border-t-sky-900 h-[10vh]">

    </div>
    </div>
  )
};

export default Page;