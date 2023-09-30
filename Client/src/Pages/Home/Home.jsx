import React, { useEffect, useState } from 'react'
import CreateTweet from '../../Components/CreateTweet/CreateTweet'
import TweetCard from '../../Components/TweetCard/TweetCard'
import { Link, useNavigate } from 'react-router-dom'
import PostsSkeleton from '../../Components/PostsSkeleton/PostsSkeleton'
function Home() {
  const [tweets,setTweets]=useState([])
  const [loading,setLoading]=useState(true)
  const navigator=useNavigate()
  const getAllTweets=async()=>{
    const response=await fetch(`${import.meta.env.VITE_SERVER_URL}/api/tweets/displayAllTweets`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+document.cookie.split('=')[1]
      }
    })
    const data=await response.json()
    if(!data.error){
    setTweets(data.allTweets)
    setLoading(false)
    }
  }
  useEffect(()=>{
    if(!document.cookie.split('=')[1]){
      navigator('/login')
    }
    getAllTweets()
  },[tweets])
  return (
    <>
   
    <div className='bg-black w-full min-h-screen text-white p-6 ml-[16rem]'>
    <h1 className='font-bold text-3xl'>Home</h1>
    <h1 className='font-bold text-xl mt-4'>Welcome, {JSON.parse(localStorage.getItem('user_data'))?.userName}</h1>
    <CreateTweet/>
   {loading && <PostsSkeleton/>}
    {tweets?.map(tweet=>(
      <TweetCard tweet={tweet} key={tweet._id}/>
    )
    )
    }
    </div>
    </>
  )
}

export default Home