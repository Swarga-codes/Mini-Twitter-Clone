import React, { useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function PostsSkeleton() {

  
  
  return (
   
    [...Array(5)].map((posts)=>(
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <div className='TweetCard text-white mt-10 p-6 w-fit'>
        <div className="TweetHead flex">
        <div className="flex">
        <Skeleton className='rounded-3xl'  height={50} width={50}/>
        <Skeleton className='ml-5 font-bold w-96'/>
        </div>
      
    
        </div>
        <div className='TweetContent mt-10 p-2'>
        <Skeleton className='w-full' count={5}/>
       
        <Skeleton className='rounded-xl mt-6' height={300} width={550}/>
    
    
        </div>
        </div>
        </SkeletonTheme>
    ))
 
   
  )
}

export default PostsSkeleton