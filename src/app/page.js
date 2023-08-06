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
  <div style={{ backgroundImage: "url('back.jpg')", opacity: 0.90 }}  className="flex flex-col items-center bg-[#e7ecef] bg-cover bg-center">
    <div className='nav flex justify-between pt-5  pb-8 h-[10vh] w-[65vw] rounded-b-2xl'>
      <div className='text-4xl xs:text-base text-[#03045e] flex items-center'>
        <img src="logo2.png" className="w-16 h-16 xs:w-12 xs:h-12"></img>
        <h1>Beine</h1>
      </div>
      <div className='flex justify-between items-center text-[#03045e]' >
        <button className='text-2xl py-1 px-4 rounded-2xl border-2 bg-[#e7ecef] shadow-lg xs:text-sm  xs:px-2' onClick={navigate}>
          Sign in
        </button>
      </div>
    </div>
    <div className="main flex justify-center items-center h-[80vh] w-[65vw] xs:items-start xs:pt-8">
      <div className='flex justify-around items-center gap-[10vw]  xs:flex-col-reverse'>
        <div className="flex flex-col gap-8 ">
          <div>
          <h2 className="font-sans text-4xl font-semibold text-[#03045e] xs:text-xl">

            Imagine having a video
             created for any topic
              you’d like to learn—
              introducing Beine!
          </h2>
          </div>
          <div>
          <button className='text-2xl py-2 px-4 rounded-2xl bg-[#03045e] shadow-lg xs:text-base' onClick={navigate}>
            Get Started
         </button> 
          </div>
        </div>

          <img src = "cat.gif" className="rounded-2xl w-[30vw] xs:w-full">
          </img>
        
      </div>
    </div>
    <div className="px-20 pt-8  pb-5 rounded-t-2xl h-[10vh]">

    </div>
  </div>
  )
};

export default Page;