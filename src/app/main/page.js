'use client'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import ReactPlayer from 'react-player'

import Link from 'next/link'

const Page = () => {


  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  function signOut() {
    localStorage.removeItem('token');
    router.push('/');
  }

  const axios = require('axios');

  console.log(localStorage.getItem('token'))


  async function uploadVideo() {
    console.log("Erbo mal");
  try {
    const requestBody = {
      prompt: prompt,
    };


    const response = await axios.post('https://fastapi-p25o.onrender.com/video/newvideo', requestBody, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, 
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

  return (
    <div style={{ backgroundImage: "url('back.jpg')", opacity: 0.90 }}  className="flex flex-col items-center bg-[#e7ecef] bg-cover bg-center">
       <div className='nav flex justify-between pt-5  pb-8 h-[10vh] w-[65vw] rounded-b-2xl'>
      <div className='text-4xl text-[#03045e] flex'>
      <img src="logo2.png" className=""></img>
        <h1>Beine</h1>
      </div>
      <div className='flex justify-between items-end text-[#03045e]' >
      <p className='text-2xl mr-8'>
        <Link href="/videos"> Videos </Link>
        </p>
        <p className='text-2xl mr-8'>
          Learn more
        </p>
        <button className='text-2xl h-10 w-32 rounded-2xl border-2 bg-[#e7ecef] shadow-lg' onClick={signOut}>
          Sign out
        </button>
      </div>
    </div>
    <div className="h-[80vh] flex justify-center items-center gap-52 bg-cover bg-center">

        <div className="h-1/3 shadow-lg rounded-2xl flex flex-col justify-center gap-6 items-center bg-white">
            <input className="shadow-lg rounded-2xl w-2/3 h-1/4 p-3 bg-[#e7ecef] text-black" placeholder="Write your topic here" onChange={e => setPrompt(e.target.value)}>
            </input>
            <button className="text-2xl py-2 px-4 rounded-2xl bg-[#03045e] shadow-lg" onClick={uploadVideo}>
                Submit
            </button>
        </div>

        {
          videoUrl ? (
            <div className="w-[512px]  h-[512px] shadow-lg rounded-2xl relative">
            <video src= {videoUrl} controls className="w-full h-full rounded-2xl"></video>
            </div>
          ) : (
            <div className="w-[512px]  h-[512px] shadow-lg rounded-2xl relative">
            <img src = "\accets\tv-static.gif" className="w-full h-full rounded-2xl opacity-30"></img>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <span className="text-white text-3xl font-semibold  py-2 px-5 rounded-2xl opacity-80">Your future video will be here.</span>
            </div>
            </div>
          )

        }
        
    </div>
    <div className="px-20 pt-8  pb-5 rounded-t-2xl h-[10vh]">

    </div>
    </div>
  )
};

export default Page;