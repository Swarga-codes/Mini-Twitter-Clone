import  React from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import SignUp from './Pages/SignUp/SignUp'
import Profile from './Pages/Profile/Profile'
import UserProfile from './Pages/UserProfile/UserProfile'
import MyFollowing from './Pages/MyFollowing/MyFollowing'
function App() {

  return (
    <>
    <Routes>
 
    <Route exact path='/' element={<Home/>}/>
    <Route exact path='/login' element={<Login/>}/>
    <Route exact path='/register' element={<SignUp/>}/>
    <Route exact path='/profile' element={<Profile/>}/>
    <Route exact path='/user/:profileId' element={<UserProfile/>}/>
    <Route exact path='/following/tweets' element={<MyFollowing/>}/>
    
  
  </Routes>
    </>
  )
}

export default App
