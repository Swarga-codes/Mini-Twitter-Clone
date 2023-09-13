import React from 'react'
import dateFormatter from '../../utils/dateFormatter'
import { Trash2 } from 'lucide-react'
function TweetCard({tweet}) {
  return (
    <div className='TweetCard text-white mt-10 p-6'>
    <div className="TweetHead flex">
    <img src="https://i.ibb.co/4pDNDk1/avatar.png" alt="no prev" className='rounded-3xl'  height={50} width={50}/>
    <p className='ml-5 font-bold'>{tweet?.postedBy?.userName} &nbsp;&nbsp;· {dateFormatter(tweet?.createdAt)}</p>
    {tweet?.postedBy?._id===JSON.parse(localStorage.getItem('user_data'))?._id &&
    <Trash2 className="m-auto stroke-red-400 cursor-pointer"/>
}
    </div>
    <div className='TweetContent mt-10 p-2'>
    <h1>{tweet?.tweetCaption}</h1>
    {tweet?.photo &&
    <img src={tweet.photo} alt="" className='rounded-xl mt-6' height={600} width={600}/>
}
    </div>
    </div>
  )
}

export default TweetCard