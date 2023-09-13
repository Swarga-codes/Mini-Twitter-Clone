import React, { useEffect, useState } from 'react'
import TweetCard from '../../Components/TweetCard/TweetCard'
import { useParams } from 'react-router-dom'
function UserProfile() {
    const [tweets,setTweets]=useState([])
    const [user,setUser]=useState()
    const {profileId}=useParams()
    const getUserData=async()=>{
        const response=await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/${profileId}`,{
          method:'GET',
          headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+document.cookie.split('=')[1]
          }
        })
        const data=await response.json()
        if(!data.error){
        setUser(data.getUser)
        }
      }
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
        getUserData()
getAllTweets()
      },[])
  return (
    <div className='bg-black w-full h-[100vh] text-white p-6 ml-[16rem]'>
    <div className='mt-10'>
    <img
    className="inline-block h-36 w-36 rounded-full"
    src={user?.profilePic}
    alt="profile pic"
  />
 
  <h1 className="mt-10 font-bold text-2xl">{user?.userName}</h1>
  <button className='flex mt-5 items-center px-10 py-[0.5rem] bg-blue-400 text-white font-bold text-xl rounded-full'>
  Follow</button>
  <p className='mt-5 font-semibold text-lg'>Joined on 14th October 2022</p>
  <p className='mt-5 font-semibold text-lg'><b>{user?.following?.length} </b>Following &nbsp; &nbsp; <b>{user?.followers?.length} </b>Followers</p>
  </div>
  <div className="MyTweets">
  <h1 className="mt-10 font-bold text-2xl">Tweets Posted</h1>
  {
    tweets?.filter(tweet=>tweet?.postedBy?.userName===user?.userName)?.map(userTweet=>(
        <TweetCard tweet={userTweet}/>
    ))
  }
  </div>
    </div>
  )
}

export default UserProfile