import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import toast,{Toaster} from 'react-hot-toast'
import { Ring } from '@uiball/loaders'
export default function Popup({open,setOpen,tweet}) {
  
    const [tweetCaption,setTweetCaption]=useState(tweet.tweetCaption)
    const [photo,setPhoto]=useState(tweet?.photo)
    const [video,setVideo]=useState(tweet?.video)
    const [isChanged,setIsChanged]=useState(false)
    const [loading,setLoading]=useState(false)
    const imageRef=useRef()
    const [url,setUrl]=useState("")
    const updateTweet=async()=>{
        const response=await fetch(`${import.meta.env.VITE_SERVER_URL}/api/tweets/updateTweet`,{
          method:'PATCH',
          headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+document.cookie.split('=')[1]
          },
          body:JSON.stringify({
            tweetId:tweet._id,
            tweetCaption,
            photo:url?url:photo,
            video
          })
    
        })
        const data=await response.json()
        if(!data.error){
          toast.success(data.message)
          setLoading(false)
          setOpen(false)
        }
        else{
          toast.error(data.error)
          setLoading(false)
          setOpen(false)
        }
      }
      const loadFile = (e) => {
        let output = document.getElementById("output");
        output.src = URL.createObjectURL(e.target.files[0]);
        output.onload = () => {
          URL.revokeObjectURL(output.src);
        };
      };
      const sendImageToCloudinary = () => {
        const data = new FormData();
        data.append("file", photo);
        data.append("upload_preset", "mini_twitter");
        data.append("cloud_name", `${import.meta.env.VITE_CLOUD_KEY}`);
        fetch(`${import.meta.env.VITE_CLOUD_URL}`, {
          method: "POST",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            setUrl(data.url);
            console.log(data.url);
          })
          .catch((err) => console.log(err));
      };
  const cancelButtonRef = useRef(null)
useEffect(()=>{
if(url){
    updateTweet()
}
},[url])
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative p-5 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div>
              <h1 className='font-semibold text-2xl'>Edit Tweet</h1>
              <div className="w-full">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="name"
              >
                Tweet Caption
              </label>
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Enter your tweet caption"
                id="name"
                value={tweetCaption}
                onChange={(e)=>setTweetCaption(e.target.value)}
                required
              ></input>
            </div>
            <input id="file-upload" name="file-upload" type="file" className="hidden" accept='image/*' ref={imageRef}
        onChange={(e)=>{
          loadFile(e)
          setPhoto(e.target.files[0])
          setIsChanged(true)
          console.log(e.target.files[0])
        }}
        />
            {tweet?.photo &&
            <img src={tweet?.photo} alt="no preview" className='mt-5 rounded-lg' id='output' onClick={()=>{
                imageRef.current.click()
            }}/>
            }
              </div>  
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {!loading?
                    <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 sm:ml-3 sm:w-auto"
                    onClick={async() => {
                        setLoading(true)
                        if(!isChanged){
                        await updateTweet()
                        }
                        else{
                        sendImageToCloudinary()
                        }
                    }}
                  >
                    Update
                  </button>
                :
                <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 sm:ml-3 sm:w-auto"
              >
              <Ring 
              size={25}
              lineWeight={5}
              speed={2} 
              color="white" 
             />
              </button>
                
                }
                  
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
