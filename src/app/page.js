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
  <div className="flex flex-col items-center bg-[#e7ecef]">
    <div className='nav flex justify-between pt-5  pb-8 h-[10vh] w-[65vw] rounded-b-2xl'>
      <div className='text-5xl text-[#03045e]'>
        <h1>Beine</h1>
      </div>
      <div className='flex justify-between items-end text-[#03045e]' >
        <p className='text-2xl mr-8'>
          Learn more
        </p>
        <button className='text-2xl h-10 w-32 rounded-2xl border-2 bg-[#e7ecef] shadow-lg' onClick={navigate}>
          Sign in
        </button>
      </div>
    </div>
    <div className="main flex justify-center items-center h-[80vh] w-[65vw]">
      <div className='flex justify-around items-center gap-[10vw]'>
      
        <div className="flex flex-col gap-8 ">
          <div>
          <h2 className="font-sans text-4xl font-semibold text-[#03045e]">

            Imagine having a video
             created for any topic
              you’d like to learn—
              introducing Beine!
          </h2>
          </div>
          <div>
          <button className='text-2xl py-2 px-4 rounded-2xl bg-[#03045e] shadow-lg' onClick={navigate}>
            Get Started
         </button> 
          </div>
        </div>

          <img src = "cat.gif" className="rounded-2xl w-[30vw]">
          </img>
        
      </div>
    </div>
    <div className="px-20 pt-8  pb-5 rounded-t-2xl h-[10vh]">

    </div>
  </div>
  )
};

export default Page;