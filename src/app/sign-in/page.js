'use client'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

import Link from 'next/link'


const Page = () => {
    const axios = require('axios');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    async function authorizeUser() {
        try {
          const userData = new URLSearchParams();
          userData.append('grant_type', 'password');
          userData.append('username', username.trim());
          userData.append('password', password);


          const response = await axios.post('https://fastapi-p25o.onrender.com/auth/users/tokens', userData, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });
          
          console.log('Authorization successful. Access Token:', response.data.access_token);
          if(response.status == 200) {
            localStorage.setItem('token', response.data.access_token)
            router.push('/main');
          }
        } catch (error) {
          console.error('Authorization error:', error.message);
        }
      }
      

      return (
    <div className="bg-[#e7ecef]">
        <div className='text-5xl flex justify-center items-center px-20 pt-5  pb-8 h-[10vh] text-[#03045e] xs:text-3xl'>
            <Link href="/"> Beine </Link>
        </div>
        <div className="h-[80vh] flex justify-center items-center">
            <div className="w-1/5 h-2/3 rounded-2xl flex flex-col justify-center gap-6 items-center relative shadow-lg bg-white xs:w-4/5 xs:py-12">
                <h2 className="text-2xl font-semibold text-[#03045e] xs:text-base">
                    Welcome back
                </h2>
                <input className="bg-transparent border-b-2 border-b-[#03045e] text-black" placeholder="Username" onChange={e => setUsername(e.target.value)}>
                </input>
                <input className="bg-transparent border-b-2 border-b-[#03045e] text-black" placeholder="Password" type="password" onChange={e => setPassword(e.target.value)}>

                </input>
                <button className="rounded-2xl rounded-2xl bg-[#03045e] shadow-lg py-2 px-6 text-2xl xs:py-1 xs:px-4" onClick={authorizeUser}>
                    Sign in
                </button>
                <p className="text-[#03045e]">
                    Don't have an account?  <Link href="/sign-up" className="text-pink-500"> Sign up </Link>
                </p>
            </div>
        </div>
    </div>
      )
}

export default Page;