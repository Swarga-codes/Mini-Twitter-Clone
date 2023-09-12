import React from 'react'

function TweetCard() {
  return (
    <div className='TweetCard text-white mt-10 p-6'>
    <div className="TweetHead flex">
    <img src="https://i.ibb.co/4pDNDk1/avatar.png" alt="no prev" className='rounded-3xl'  height={50} width={50}/>
    <p className='ml-5 font-bold'>Anonymous &nbsp;&nbsp;· 16h</p>
    </div>
    <div className='TweetContent mt-10 p-2'>
    <h1>Hello world!! My first tweet!! excited to build this clone!!</h1>
    <img src="https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className='rounded-xl mt-6' height={600} width={600}/>
    </div>
    </div>
  )
}

export default TweetCard