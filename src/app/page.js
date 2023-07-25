'use client'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

import Link from 'next/link'


const Page = () => {

  const router = useRouter();

  if (typeof window !== 'undefined'){
    if (localStorage.getItem("token")) {
      router.push("/main");
    }
  }
  function navigate() {
    router.push('/sign-in');
  }

  return(
  <div style={{ backgroundImage: "url('bgGif.gif')", opacity: 0.90 }} className="bg-cover bg-center ">
    <div className='nav flex justify-between px-20 pt-5  pb-8 border-b-2 border-b-sky-900 h-[10vh]'>
      <div className='text-5xl'>
        <h1>Beine</h1>
      </div>
      <div className='flex justify-between items-end' >
        <p className='text-2xl mr-8'>
          Learn more
        </p>
        <button className='text-2xl h-10 w-32 rounded-2xl border-2 border-sky-800 shadow-lg shadow-sky-700/50' onClick={navigate}>
          Sing in
        </button>
      </div>
    </div>
    <div className="main flex justify-center items-center h-[80vh]">
      <div className='flex flex-col justify-center items-center gap-8'>
        <h2 className='text-5xl text-center'>
          AI ASSISTANT: CLEAR VIDEO <br />
          EXPLANATIONS FOR <br />
          EVERYONE
        </h2>
        <button className='text-2xl w-36 h-36 rounded-full border-2 border-sky-800 shadow-lg shadow-sky-700/50' onClick={navigate}>
          Start
        </button>
      </div>
    </div>
    <div className="px-20 pt-8  pb-5 border-t-2 border-t-sky-900 h-[10vh]">

    </div>
  </div>
  )
};

export default Page;