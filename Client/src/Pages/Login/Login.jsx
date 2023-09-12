import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";

function Login() {
    const [userName,setUserName]=useState("")
    const [password,setPassword]=useState("")
    const navigator=useNavigate()
    const [error,setError]=useState("")
    const loginUser=async()=>{
        const response=await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                userName,
                password
            })
        })
        const data=await response.json()
        if(!data.error){
        localStorage.setItem('user_data',JSON.stringify(data.userData))
        navigator('/')
        }
        else{
            setError(data.error)
        }
    }
  return (
    <div className="flex min-h-[100vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-slate-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="m-auto fill-white r-1nao33i r-4qtqp9 r-yyyyoo r-16y2uox r-8kz0gk r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp"
        height={100}
        
          >
          <g>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </g>
        </svg>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Sign in to your Twitter account
        </h2>
        <p className="text-center font-semibold text-red-500 mt-2">{error}</p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={(e)=>{
            e.preventDefault()
            loginUser()
        }}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-white"
            >
              User Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
              onChange={(e)=>setUserName(e.target.value)}
                />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
              onChange={(e)=>setPassword(e.target.value)}
                />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not Registered?{" "}
          <Link
          to='/register'
            className="font-semibold leading-6 text-sky-500 hover:text-sky-500"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
