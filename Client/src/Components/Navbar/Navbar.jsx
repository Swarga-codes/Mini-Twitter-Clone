import React from 'react'
import { Home, UserCheck, User, LogOut, Bird, Paperclip, Brush, Wrench } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import exceptions from '../../utils/nonSidebarRoutes'
export default function Navbar() {
    const location=useLocation()
    if(exceptions.includes(location.pathname)){
        return null
    }
  return (
    <aside className="fixed flex h-[100%] w-64 flex-col overflow-y-auto border-r bg-black px-5 py-8">
    <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="mr-auto fill-white r-1nao33i r-4qtqp9 r-yyyyoo r-16y2uox r-8kz0gk r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp"
  height={100}
  
    >
    <g>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
    </g>
  </svg>
      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6 ">
          <div className="space-y-3 mt-10">
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-gray-700"
              href="#"
            >
              <Home className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-lg font-medium">Home</span>
            </a>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
          
              <UserCheck className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-lg font-medium">My Following</span>
            </a>
            <a
            className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
            href="#"
          >
            <User className="h-5 w-5" aria-hidden="true" />
            <span className="mx-2 text-lg font-medium">Profile</span>
          </a>
          <a
            className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
            href="#"
          >
            <LogOut className="h-5 w-5" aria-hidden="true" />
            <span className="mx-2 text-lg font-medium">Logout</span>
          </a>
          </div>
          

          <div className="space-y-3 ">
           <button className='flex items-center px-12 py-4 bg-blue-400 text-white font-bold text-xl rounded-full'>
           <Bird />
           <span className='ml-2'>Tweet</span></button>
          </div>
        </nav>
      </div>
    </aside>
  )
}
