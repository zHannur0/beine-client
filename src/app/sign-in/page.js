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
          userData.append('username', username);
          userData.append('password', password); 
      
          const response = await axios.post('http://localhost:8000/auth/users/tokens', userData, {
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
    <div>
        <div className='text-5xl flex justify-center items-center px-20 pt-5  pb-8 h-[10vh]'>
            <h1>Beine</h1>
        </div>
        <div className="h-[80vh] flex justify-center items-center">
            <div className="w-1/5 h-2/3 border-2 border-sky-800 rounded-2xl flex flex-col justify-center gap-6 items-center relative">
                <h2 className="text-2xl font-semibold">
                    Welcome back
                </h2>
                <input className="bg-transparent border-b-2 border-b-sky-800" placeholder="Username" onChange={e => setUsername(e.target.value)}>
                </input>
                <input className="bg-transparent border-b-2 border-b-sky-800" placeholder="Password" onChange={e => setPassword(e.target.value)}>

                </input>
                <p>
                    Forgot password
                </p>
                <button className="bg-transparent border-2 border-sky-800 rounded-2xl h-[5vh] w-[10vw]" onClick={authorizeUser}>
                    Sign in
                </button>
                <p>
                    Don't have an account?  <Link href="/sign-up"> Sign up </Link>
                </p>
            </div>
        </div>
    </div>
      )
}

export default Page;