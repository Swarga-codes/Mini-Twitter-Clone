import React, { useEffect, useState } from 'react'
import TweetCard from '../../Components/TweetCard/TweetCard'
import { useNavigate } from 'react-router-dom'
import PostsSkeleton from '../../Components/PostsSkeleton/PostsSkeleton'
function Profile() {
    const [tweets,setTweets]=useState([])
    const [user,setUser]=useState([])
    const [loading,setLoading]=useState(true)
    const navigator=useNavigate()
    const getUserData=async()=>{
        const response=await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/${JSON.parse(localStorage.getItem('user_data'))?._id}`,{
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
        setLoading(false)
        }
      }
      useEffect(()=>{
        if(!document.cookie.split('=')[1]){
          navigator('/login')
        }
        getUserData()
getAllTweets()
      },[tweets])
  return (
    <div className='bg-black w-full min-h-screen text-white p-6 ml-[16rem]'>
    <h1 className='font-bold text-3xl'>Profile</h1>
    <div className='mt-10'>
    <img
    className="inline-block h-36 w-36 rounded-full"
    src={user?.profilePic}
    alt="profile pic"
  />
  <h1 className="mt-10 font-bold text-2xl">{user?.userName}</h1>
  <p className='mt-5 font-semibold text-lg'>Joined on 14th October 2022</p>
  <p className='mt-5 font-semibold text-lg'><b>{user?.following?.length} </b>Following &nbsp; &nbsp; <b>{user?.followers?.length} </b>Followers</p>
  </div>
  <div className="MyTweets">
  <h1 className="mt-10 font-bold text-2xl">Tweets Posted</h1>
  {loading && <PostsSkeleton/>}
  {
    tweets?.filter(tweet=>tweet?.postedBy?.userName===JSON.parse(localStorage.getItem('user_data'))?.userName)?.map(userTweet=>(
        <TweetCard tweet={userTweet} key={userTweet._id}/>
    ))
  }
  </div>
    </div>
  )
}

export default Profile