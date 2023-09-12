import React from 'react'
import CreateTweet from '../../Components/CreateTweet/CreateTweet'
import TweetCard from '../../Components/TweetCard/TweetCard'

function Home() {
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