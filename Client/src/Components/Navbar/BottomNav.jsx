import React from 'react'
import { Home, UserCheck, User, LogOut, Bird } from 'lucide-react'
import { Link } from 'react-router-dom'

function BottomNav() {
    const logoutUser=async()=>{
        const response=await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
        })
        const data=await response.json()
        console.log(data)
        if(data.message){
            localStorage.clear()
            document.cookie = "token" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            navigator('/login')
        }
    }
  return (
    <div className='BottomNav bg-black hidden text-white p-6 border-t-2 border-t-white fixed bottom-0 w-full z-10'>
<Link to={'/'}><Home/></Link>
    <Link to={'/following/tweets'}><UserCheck/></Link>
    <Link to={'/'}>    <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="mr-auto fill-white r-1nao33i r-4qtqp9 r-yyyyoo r-16y2uox r-8kz0gk r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp"
  height={25}
  
    >
    <g>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
    </g>
  </svg></Link>
    <Link to={'/profile'}><User/></Link>
    <LogOut onClick={()=>{
        if(window.confirm('Would you like to logout?')){
            logoutUser()
        }
    }}/>
    </div>
  )
}

export default BottomNav