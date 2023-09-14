import React from 'react'
import dateFormatter from '../../utils/dateFormatter'
import { Trash2 } from 'lucide-react'
import toast,{Toaster} from 'react-hot-toast'
import { Link, useLocation } from 'react-router-dom'
function TweetCard({tweet}) {
  const location=useLocation()
  const deleteTweet=async()=>{
    const response=await fetch(`${import.meta.env.VITE_SERVER_URL}/api/tweets/delete/${tweet._id}`,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+document.cookie.split('=')[1]
      }
    })
    const data=await response.json()
    if(!data.error){
      toast.success(data.message)
    }
    else{
      toast.error(data.error)
    }
  }
  return (
    <>
    <div>
    <Toaster position="top-center" reverseOrder={false} />
  </div>
    <div className='TweetCard text-white mt-10 p-6'>
    <div className="TweetHead flex">
    <Link to={JSON.parse(localStorage.getItem('user_data'))?._id===tweet?.postedBy?._id?`/profile`:`/user/${tweet?.postedBy?._id}`}>
    <div className="flex">
    <img src="https://i.ibb.co/4pDNDk1/avatar.png" alt="no prev" className='rounded-3xl'  height={50} width={50}/>
    <p className='ml-5 font-bold'>{tweet?.postedBy?.userName} &nbsp;&nbsp;· {dateFormatter(tweet?.createdAt)}</p>
    </div>
    </Link>
    {tweet?.postedBy?._id===JSON.parse(localStorage.getItem('user_data'))?._id && location.pathname==='/profile' &&
    <Trash2 className="m-auto stroke-red-400 cursor-pointer" onClick={()=>{
      if(window.confirm('Do you really want to delete this tweet?')){
        deleteTweet()
      }
    }}/>
}
    </div>
    <div className='TweetContent mt-10 p-2'>
    <h1>{tweet?.tweetCaption}</h1>
    {tweet?.photo &&
    <img src={tweet.photo} alt="" className='rounded-xl mt-6' height={600} width={600}/>
}
    </div>
    </div>
    </>
  )
}

export default TweetCard