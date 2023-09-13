import React, { useEffect, useState } from 'react'
import TweetCard from '../../Components/TweetCard/TweetCard'
function Profile() {
    const [tweets,setTweets]=useState([])
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
        }
      }
      useEffect(()=>{
getAllTweets()
      },[])
  return (
    <div className='bg-black w-full h-[100%] text-white p-6 ml-[16rem]'>
    <h1 className='font-bold text-3xl'>Profile</h1>
    <div className='mt-10'>
    <img
    className="inline-block h-36 w-36 rounded-full"
    src={JSON.parse(localStorage.getItem('user_data'))?.profilePic}
    alt="profile pic"
  />
  <h1 className="mt-10 font-bold text-2xl">{JSON.parse(localStorage.getItem('user_data'))?.userName}</h1>
  <p className='mt-5 font-semibold text-lg'>Joined on 14th October 2022</p>
  <p className='mt-5 font-semibold text-lg'><b>27 </b>Following &nbsp; &nbsp; <b>4 </b>Followers</p>
  </div>
  <div className="MyTweets">
  <h1 className="mt-10 font-bold text-2xl">Tweets Posted</h1>
  {
    tweets?.filter(tweet=>tweet?.postedBy?.userName===JSON.parse(localStorage.getItem('user_data'))?.userName)?.map(userTweet=>(
        <TweetCard tweet={userTweet}/>
    ))
  }
  </div>
    </div>
  )
}

export default Profile