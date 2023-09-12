import React from 'react'
import { Image, PlayCircle } from 'lucide-react'
function CreateTweet() {
  return (
    <div className='CreateTweet text-white w-fit mt-10 px-10'>
    <h1 className='font-semibold text-lg'>Create a Tweet!</h1>
    <textarea name="tweet" id="tweet" cols="75" rows="5" placeholder="What's happening?" className='outline-none bg-black mt-4 text-white p-3'/>
   <div className='flex mt-4'>
    <div className='add_icons flex'>
    <Image className='text-blue-500 mr-4 cursor-pointer'/>
    <PlayCircle className='text-blue-500 cursor-pointer'/>
    </div>
    <div className="flex w-fit ml-auto">
    <button className='bg-blue-500 p-3 px-5 font-bold rounded-3xl'>Tweet</button>
    </div>
    </div>
    </div>
  )
}

export default CreateTweet