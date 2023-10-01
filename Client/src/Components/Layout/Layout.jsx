import React from 'react'
import Navbar from '../Navbar/Navbar'
import BottomNav from '../Navbar/BottomNav'

function Layout({children}) {
  return (
    <>
    <div className='flex'>
    <Navbar/>
    {children}
    </div>
    <BottomNav/>
    </>
  )
}

export default Layout