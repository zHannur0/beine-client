'use client'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link'



const Page = () => {

    const axios = require('axios');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const router = useRouter();

    async function registerUser() {
        if(password != '' && password === confPassword){
        try {
            const userData = {
              username: username.trim(),
              password: password,
            };
          
          const response = await axios.post('https://fastapi-p25o.onrender.com/auth/users', userData);
      
          console.log('User registered successfully:', response.status);

          if(response.status == 201) {
            router.push('/sign-in')
          }
         
          
        } catch (error) {
          console.error('Error registering user:', error.message);
          if(error.message === "Request failed with status code 400") {
            window.alert("Username already exist!")
          }
        }
      }else {
        window.alert("Wrong password!!!")
      }
    }


    return (
        <div className="bg-[#e7ecef]">
            <div className='text-5xl flex justify-center items-center px-20 pt-5  pb-8 h-[10vh] text-[#03045e] xs:text-3xl'>
                <h1>
                    <Link href="/"> Beine </Link>

                </h1>
            </div>
            <div className="h-[80vh] flex justify-center items-center">
                <div className="w-1/5 h-2/3 shadow-lg bg-white rounded-2xl flex flex-col justify-center gap-8 items-center relative xs:w-4/5">
                    <h2 className="text-2xl font-semibold text-[#03045e]">
                        Sign up
                    </h2>
                    {/* <input className="bg-transparent border-b-2 border-b-sky-800" placeholder="Email">
                    </input> */}
                    <input className="bg-transparent border-b-2 border-b-sky-800 text-black" placeholder="Username" onChange={e => setUsername(e.target.value)}>
                    </input>
                    <input className="bg-transparent border-b-2 border-b-sky-800 text-black" placeholder="Password" onChange={e => setPassword(e.target.value)}>
                    </input>
                    <input className="bg-transparent border-b-2 border-b-sky-800 text-black" placeholder="Confirm passwod" onChange={e => setConfPassword(e.target.value)}>
                    </input>
                    <button className="rounded-2xl rounded-2xl bg-[#03045e] shadow-lg py-2 px-6 text-2xl" onClick={registerUser}>
                        Sign up
                    </button>
                    <p className="text-[#03045e]">
                        You already have an account?  <Link href="/sign-in" className="text-pink-500"> Sign in </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Page;