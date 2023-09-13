import React, { useEffect } from 'react'
import CreateTweet from '../../Components/CreateTweet/CreateTweet'
import TweetCard from '../../Components/TweetCard/TweetCard'

function Home() {
  const getProtected=async()=>{
    const response=await fetch(`${import.meta.env.VITE_SERVER_URL}/api/tweets/createTweet`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+document.cookie.split('=')[1]
      }, 
    })
    const data=await response.json()
    console.log(data)
  }
  useEffect(()=>{
    getProtected()
  },[])
  return (
    <div className='bg-black w-full text-white p-6 ml-[16rem]'>
    <h1 className='font-bold text-3xl'>Home</h1>
    <h1 className='font-bold text-xl mt-4'>Welcome, {JSON.parse(localStorage.getItem('user_data'))?.userName}</h1>

    <CreateTweet/>
    <TweetCard/>
    </div>
  )
}

export default Home