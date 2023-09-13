import React, { useEffect, useRef, useState } from "react";
import { Image, PlayCircle } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { Ring } from '@uiball/loaders'


function CreateTweet() {
  const [tweetCaption, setTweetCaption] = useState("");
  const [photo, setPhoto] = useState("");
  const [video, setVideo] = useState("");
  const [url,setUrl]=useState("")
  const [loading,setLoading]=useState(false);
  const imageRef=useRef()
  const createTweet = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/tweets/createTweet`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + document.cookie.split("=")[1],
        },
        body: JSON.stringify({
          tweetCaption,
          photo:photo?url:"",
          video:video?url:"",
        }),
      }
    );
    const data = await response.json();
    if (!data.error) {
      toast.success(data.message);
      setTweetCaption("");
      setPhoto("");
      setVideo("");
      setLoading(false)
    } else {
      toast.error(data.error);
      setLoading(false)
    }
  };
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
  useEffect(()=>{
    if(url){
      createTweet()
    }
  },[url])
  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <div className="CreateTweet text-white w-fit mt-10 px-10">
        <h1 className="font-semibold text-lg">Create a Tweet!</h1>
        <textarea
          name="tweet"
          id="tweet"
          value={tweetCaption}
          cols="75"
          rows="5"
          placeholder="What's happening?"
          className=" bg-black mt-4 text-white p-3 focus:ring-blue-500 outline-blue-500"
          onChange={(e)=>setTweetCaption(e.target.value)}
        />
      {photo?
        <img id='output' height={300} width={300}/>
        :
        <img id='output' height={300} width={300} className="hidden"/>
      }
        <input id="file-upload" name="file-upload" type="file" className="hidden" accept='image/*' ref={imageRef}
        onChange={(e)=>{
          loadFile(e)
          setPhoto(e.target.files[0])
          console.log(e.target.files[0])
        }}
        />
        <div className="flex mt-4">
          <div className="add_icons flex">
            <Image className="text-blue-500 mr-4 cursor-pointer" onClick={()=>imageRef.current.click()}/>
            <PlayCircle className="text-blue-500 cursor-pointer" />
          </div>
          <div className="flex w-fit ml-auto">
          {!loading?
            <button
              className="bg-blue-500 p-3 px-5 font-bold rounded-3xl"
              onClick={() => {
                setLoading(true)
                if(photo){
                  sendImageToCloudinary()
                }else{
                  createTweet()
                }
              
              }}
            >
              Tweet
            </button>
            :
            <button
              className="bg-blue-500 p-3 px-5 font-bold rounded-3xl"
            >
            <Ring 
 size={25}
 lineWeight={5}
 speed={2} 
 color="white" 
/>
            </button>
            

            }
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateTweet;
