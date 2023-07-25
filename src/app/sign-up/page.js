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
            username: username,
            password: password,
          };
          
          const response = await axios.post('http://localhost:8000/auth/users', userData);
      
          console.log('User registered successfully:', response.data);

          if(response.status == 200) {
            router.push('/sign-in')
          }
        } catch (error) {
          console.error('Error registering user:', error.message);
        }
      }else {
        window.alert("Wrong password!!!")
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
                        Sign up
                    </h2>
                    {/* <input className="bg-transparent border-b-2 border-b-sky-800" placeholder="Email">
                    </input> */}
                    <input className="bg-transparent border-b-2 border-b-sky-800" placeholder="Username" onChange={e => setUsername(e.target.value)}>
                    </input>
                    <input className="bg-transparent border-b-2 border-b-sky-800" placeholder="Password" onChange={e => setPassword(e.target.value)}>
                    </input>
                    <input className="bg-transparent border-b-2 border-b-sky-800" placeholder="Confirm passwod" onChange={e => setConfPassword(e.target.value)}>
                    </input>
                    <button className="bg-transparent border-2 border-sky-800 rounded-2xl h-[5vh] w-[10vw]" onClick={registerUser}>
                        Sign up
                    </button>
                    <p>
                        You already have an account?  <Link href="/sign-in"> Sign in </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Page;