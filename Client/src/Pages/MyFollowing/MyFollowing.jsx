import React, { useEffect, useState } from 'react'
import TweetCard from '../../Components/TweetCard/TweetCard'
import { Link } from 'react-router-dom'
function MyFollowing() {
    const [tweets,setTweets]=useState([])
    const getFollowingTweets=async()=>{
        const response=await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/following/tweets`,{
            method:'GET',
            headers:{
              'Content-Type':'application/json',
              'Authorization':'Bearer '+document.cookie.split('=')[1]
            }
          })
          const data=await response.json()
          if(!data.error){
          setTweets(data.getTweets)
          }
    }
    useEffect(()=>{
        getFollowingTweets()
    },[])
  return (
    <div className='bg-black w-full min-h-screen text-white p-6 ml-[16rem]'>
    <h1 className='font-bold text-3xl'>My Following</h1>
    {tweets.length>0?
        tweets?.map(tweet=>(
            <TweetCard tweet={tweet}/>
        ))
        :
        <>
        <h1 className='font-bold text-2xl mt-20'>No Tweets found, make sure you follow people</h1>
        <Link to={'/'} className='font-bold text-xl mt-20 text-sky-500'>Click To go to Home</Link>
        </>
    }
    </div>
  )
}

export default MyFollowing