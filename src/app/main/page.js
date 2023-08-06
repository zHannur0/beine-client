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
      if(prompt) {
        setLoading(true);
        const response = await axios.post('https://fastapi-p25o.onrender.com/video/newvideo', requestBody, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      }
      console.log('Video generation request successful:', response.data);


      if (response.status == 200) {
        setVideoUrl(response.data.link);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error sending video generation request:', error.message);
      setLoading(false)
      window.alert("Something went wrong! Try again!")
    }
  }

  return (
    <div style={{ backgroundImage: "url('back.jpg')", opacity: 0.90 }} className="flex flex-col items-center bg-[#e7ecef] bg-cover bg-center">
      <div className='nav flex justify-between pt-5 pb-8 h-[10vh] w-[65vw] rounded-b-2xl'>
        <div className='text-4xl xs:text-base text-[#03045e] flex items-center'>
          <img src="logo2.png" className="w-16 h-16 xs:w-12 xs:h-12"></img>
          <h1>
            <Link href="/main"> Beine </Link>
          </h1>
        </div>
        <div className='flex justify-between items-center text-[#03045e]' >
          <p className='text-2xl mr-8 xs:text-sm xs:mr-1'>
            <Link href="/videos"> Videos </Link>
          </p>
          <button className='text-2xl py-1 px-4 rounded-2xl border-2 bg-[#e7ecef] shadow-lg xs:text-sm  xs:px-2' onClick={signOut}>
            Sign out
          </button>
        </div>
      </div>

      <div className="h-[80vh] flex justify-center items-center w-[65vw] rounded-2xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-[#EBECF1] xs:flex-col xs:gap-7 xs:w-full xs:shadow-none xs:bg-transparent xs:justify-start xs:pt-16 p-4">

        <div className="flex flex-col gap-10 justify-center items-center w-[50%] xs:w-full xs:justify-between">
            <div className="w-[60%] flex items-start">
              <p className="text-[#0d3b66] text-xl font-semibold xs:text-base xs:text-center">
                Enter a topic or question and get an answer in 1-2 minutes!
              </p>
            </div>
            <div className="h-1/3 rounded-2xl flex flex-col justify-center gap-6 items-center xs:gap-4">
              <input className=" rounded-2xl h-1/4 p-3 bg-white text-black xs:w-2/3 xs:h-[30px] " placeholder="Write your topic here" onChange={e => setPrompt(e.target.value)}>
              </input>
              {
                !isLoading ? (
                        <button className="text-xl py-1 px-2 rounded-2xl bg-[#03045e] shadow-lg xs:text-xs xs:py-1" onClick={uploadVideo}>
                          Submit
                        </button>
                    ) :
                    (
                        <span className="loading loading-ball loading-lg text-[#03045e]"></span>
                    )
              }
            </div>
          </div>


        {
          videoUrl ? (
            <div className="flex xs:flex-col-reverse xs:items-center gap-1">

                  <div className="flex flex-col justify-center mr-2">
                {/*<div className="w-[48px] h-[48px] bg-[#91C8E4] rounded-[50%] my-3">*/}
                {/*    <img src="Frame.png" className = "w-[48px]  h-[48px]" alt="" />*/}
                {/*</div>*/}
                <a href={videoUrl}><div className="w-[48px] h-[48px] bg-[#a8dadc] rounded-[50%] flex justify-center items-center xs:w-[24px] xs:h-[24px]">
                 <img src="download.png" className="w-[26px] h-[26px] xs:w-[16px] xs:h-[16px]" alt="" />
                </div>
                </a>
                {/*<div className="w-[48px] h-[48px] bg-[#749BC2] rounded-[50%] my-3">*/}
                {/* <img src="Frame.png" className = "w-[48px]  h-[48px] transform rotate-180" alt="" />*/}
                {/*</div>*/}
              </div>
              <div className="w-[512px]  h-[512px] shadow-lg rounded-2xl relative xs:w-[256px] xs:h-[256px]">
                <video src={videoUrl} controls className="w-full h-full rounded-2xl "></video>
              </div>

            </div>

          ) : (
            <div className="w-[512px]  h-[512px] shadow-lg rounded-2xl relative xs:w-[256px] xs:h-[256px]">
              <img src="\accets\tv-static.gif" className="w-full h-full rounded-2xl opacity-30"></img>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <span className="text-[#4a4e69] text-3xl font-semibold  py-2 px-5 rounded-2xl opacity-80 xs:text-sm">Your future video will be here.</span>
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