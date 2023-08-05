'use client'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import ReactPlayer from 'react-player'

import Link from 'next/link'

const Page = () => {


  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setLoading] = useState(false);

  function signOut() {
    localStorage.removeItem('token');
    router.push('/');
  }

  const axios = require('axios');



  if (typeof window !== 'undefined') {
    console.log(localStorage.getItem('token'))

  }


  async function uploadVideo() {
    console.log("Erbo mal");
    try {
      const requestBody = {
        prompt: prompt,
      };

      setLoading(true);
      const response = await axios.post('https://fastapi-p25o.onrender.com/video/newvideo', requestBody, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log('Video generation request successful:', response.data);


      if (response.status == 200) {
        setVideoUrl(response.data.link);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error sending video generation request:', error.message);
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center bg-[#e7ecef] bg-cover bg-center">
      <div className='nav flex justify-between pt-5  pb-8 h-[10vh] w-[65vw] rounded-b-2xl'>
        <div className='text-4xl text-[#03045e] flex items-center'>
          <img src="logo2.png" className="w-16 h-16"></img>
          <h1>
            <Link href="/main"> Beine </Link>
          </h1>
        </div>
        <div className='flex justify-between items-center text-[#03045e]' >
          <p className='text-2xl mr-8'>
            <Link href="/videos"> Videos </Link>
          </p>
          <button className='text-2xl h-10 w-32 rounded-2xl border-2 bg-[#e7ecef] shadow-lg' onClick={signOut}>
            Sign out
          </button>
        </div>
      </div>

      <div className="h-[80vh] flex justify-center items-center gap-52 w-[65vw] rounded-2xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-[#EBECF1]">

        <div className="h-1/3 rounded-2xl flex flex-col justify-center gap-6 items-center">
          <input className=" rounded-2xl w-3/3 h-1/4 p-3 bg-white text-black" placeholder="Write your topic here" onChange={e => setPrompt(e.target.value)}>
          </input>
          {
            !isLoading ? (
              <button className="text-2xl py-2 px-4 rounded-2xl bg-[#03045e] shadow-lg" onClick={uploadVideo}>
                Submit
              </button>
            ) :
              (
                <span className="loading loading-ball loading-lg text-[#03045e]"></span>
              )

          }
        </div>

        {
          videoUrl ? (
            <div className="flex">

                  <div className="flex flex-col justify-center mr-2">
                <div className="w-[48px] h-[48px] bg-[#91C8E4] rounded-[50%] my-3">
                    <img src="Frame.png" className = "w-[48px]  h-[48px]" alt="" />
                </div>
                <a href={videoUrl}><div className="w-[48px] h-[48px] bg-[#4682A9] rounded-[50%] flex justify-center items-center">
                 <img src="download.png" className="w-[26px] h-[26px]" alt="" />
                </div>
                <div className="w-[48px] h-[48px] bg-[#749BC2] rounded-[50%] my-3">
                 <img src="Frame.png" className = "w-[48px]  h-[48px] transform rotate-180" alt="" />

                </div>
                </a>
              </div>
              <div className="w-[512px]  h-[512px] shadow-lg rounded-2xl relative">
                <video src={videoUrl} controls className="w-full h-full rounded-2xl "></video>
              </div>

            </div>

          ) : (
            <div className="w-[512px]  h-[512px] shadow-lg rounded-2xl relative">
              <img src="\accets\tv-static.gif" className="w-full h-full rounded-2xl opacity-30"></img>
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