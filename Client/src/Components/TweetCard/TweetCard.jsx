import React, { useState } from 'react'
import dateFormatter from '../../utils/dateFormatter'
import { Trash2,Pencil } from 'lucide-react'
import toast,{Toaster} from 'react-hot-toast'
import { Link, useLocation } from 'react-router-dom'
import Popup from './Popup'
function TweetCard({tweet}) {
  const location=useLocation()
  
  const [open, setOpen] = useState(false)
  
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
    <div className="m-auto flex">
    <Trash2 className="stroke-red-400 cursor-pointer mx-6" onClick={()=>{
      if(window.confirm('Do you really want to delete this tweet?')){
        deleteTweet()
      }
    }}/>
    <Pencil className="stroke-blue-500 cursor-pointer" onClick={()=>{
     setOpen(true)
      
    }}
    />
    </div>
}

    </div>
    <div className='TweetContent mt-10 p-2'>
    <h1>{tweet?.tweetCaption}</h1>
    {tweet?.photo &&
    <img src={tweet.photo} alt="" className='rounded-xl mt-6' height={600} width={600}/>
}
{tweet?.video &&
  <video src={tweet.video} className='rounded-xl mt-6' controls width='640' height='320'></video>
}
    </div>
    </div>
    <Popup open={open} setOpen={setOpen} tweet={tweet}/>
    </>
  )
}

export default TweetCard