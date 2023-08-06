'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

import Link from 'next/link';

const Page = () => {
  const [videos, setVideos] = useState([]);
  const [currVideo, setCurrVideo] = useState("");
  const [currVideoId, setCurrVideoId] = useState("");
  const [a, setA] = useState(true);
  const [currName, setCurrName] = useState("");
  const [currUsername, setUsername] = useState("");


  const apiBaseUrl = 'https://fastapi-p25o.onrender.com/video';
  const router = useRouter();

  useEffect(() => {
    const getAllVideos = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/allvideos`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setVideos(response.data.videos); // Corrected: Access 'videos' property

      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    getAllVideos();
  }, [a])

  async function addDislike() {
    try {

      const requestBody = {
        video_id: currVideoId,
      };

      const response = await axios.post(`${apiBaseUrl}/dislike`, requestBody, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        console.log('Dislike added successfully');
      }
    } catch (error) {
      console.error('Error adding dislike:', error);
    }
  };

  async function addLike() {
    try {

      const requestBody = {
        video_id: currVideoId,
      };

      const response = await axios.post(`${apiBaseUrl}/like`, requestBody, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        console.log('Like added successfully');
      }
    } catch (error) {
      console.error('Error adding like:', error);
    }
  };


  function navigate() {
    router.push('/sign-in');
  }

  function setVideoParam(videoUrl, videoId, name, username) {
    setCurrVideo(videoUrl);
    setCurrVideoId(videoId)
    if(name.length > 12) {
      setCurrName(name.substring(0,12) + "...");
    }else {
      setCurrName(name);
    }
    if(username.length > 12) {
      setUsername(username.substring(0,12) + "...")
    }else {
      setCurrName(username);
    }
  }

  function listSize(list) {
    return list ? list.length : 0
  }

  function reload() {
    setA(!a);
    setCurrVideo("");
    setCurrVideoId("");
    setCurrName("");
    setUsername("");
  }

  function subString(str) {
    console.log(str);
    if(str.length > 12) {
      setCurrName(str.substring(0, 12) + "...");
    }else {
      setCurrName(str);
    }
    console.log(str);
    return str
  }

  return (
    <div className="flex flex-col items-center bg-[#e7ecef]">
      <div className='nav flex justify-between pt-5  pb-8 h-[10vh] w-[65vw] rounded-b-2xl'>
        <div className='text-4xl xs:text-base text-[#03045e] flex items-center'>
          <img src="logo2.png" className="w-16 h-16  xs:w-12 xs:h-12" />
          <h1>
            <Link href="/main"> Beine </Link>
          </h1>
        </div>
        <div className='flex justify-between items-center text-[#03045e]'>
          <button className='text-2xl py-1 px-4 rounded-2xl border-2 bg-[#e7ecef] shadow-lg xs:text-sm  xs:px-2' onClick={navigate}>
            Sign out
          </button>
        </div>
      </div>
      <div className="flex flex-wrap w-[65vw] justify-start xs:w-[90vw] xs:justify-center">

        {videos.map((video, index) => (
          <div key={index} className='bg-white rounded-lg shadow-md p-4 m-4 w-64 xs:w-32'>
            <img src={video.image} className="w-full object-cover mb-4 rounded-md" onClick={() => setVideoParam(video.video_url, video["_id"], video.title, video.username)}></img>
            <div className='flex justify-between'>

              <div>
                <h5 className="text-black text-2xl font-semibold mb-2 xs:text-xs">{(video.title.length > 8) ? video.title.substring(0, 8) + "..." : video.title}</h5>
                <p className="text-black text-xl font-light mb-2 xs:text-sm xs:mb-0">{(video.username.length > 8) ? video.username.substring(0, 8) + "..." : video.username}</p>
              </div>
              <div>
                <div className='flex items-center'>
                  <img src="like.png" alt="" className='w-4 h-4 mr-2 xs:w-3 xs:h-3' />
                  <p className="text-black text-xs  font-light mb-2"> {listSize(video.like)}</p>
                </div>
                <div className='flex items-center'>
                  <img src="like.png" alt="" className='transform rotate-180 w-4 h-4 mr-2 xs:w-3 xs:h-3' />
                  <p className="text-black text-xs font-light mb-2"> {listSize(video.dislike)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {
          currVideo ? (
            <div className='w-screen h-screen fixed top-0 left-0 flex justify-center item-center bg-black/70'>
              <div className="flex items-center ">
                <div className='items-start bg-white px-5 py-5 rounded-xl'>
                  <div>
                    <video src={currVideo} controls muted className='w-[512px] h-[512px] xs:w-[256px] xs:h-[256px]'></video>
                  </div>
                  <div className='flex justify-between items-start mt-2'>
                    <div>
                      <h5 className='text-black text-2xl font-semibold mb-2'>{currName}</h5>
                      <p className="text-black text-xl font-light mb-2">{currUsername}</p>
                    </div>

                    <div className="flex items-center justify-center">

                      {/* <div className="w-[36px] h-[36px] bg-[#91C8E4] rounded-[50%] mx-3 flex justify-center items-center" onClick={() => addLike()}> */}
                      <img src="like.png" className="w-[22px] h-[22px] mx-3" alt="" onClick={() => addLike()} />
                      {/* </div> */}
                      {/* <div className="w-[36px] h-[36px] bg-[#749BC2] rounded-[50%] mx-3 flex justify-center items-center" onClick={() => addDislike(currVideoId)}> */}
                      <img src="like.png" className="w-[22px] h-[22px] transform rotate-180 " alt="" onClick={() => addDislike()}/>
                      {/* </div> */}
                      <a href={currVideo}>
                        {/* <div className="w-[36px] h-[36px] bg-[#4682A9] rounded-[50%] flex justify-center items-center"> */}
                        <img src="download.png" className="w-[24px] h-[24px] mx-3" alt="" />
                        {/* </div> */}
                      </a>

                      {/* <div className="w-[36px] h-[36px] bg-[#f1faee] rounded-[50%] flex justify-center items-center" onClick={() => reload()}> */}
                      <img src='x.png' className='w-[22px] h-[22px]' onClick={() => reload()} ></img>
                      {/* </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) :
            (
              <div className=''>
              </div>
            )
        }
      </div>
    </div>
  );
}
export default Page;
