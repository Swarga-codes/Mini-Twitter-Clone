import React, { useEffect, useState } from "react";
import TweetCard from "../../Components/TweetCard/TweetCard";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
function UserProfile() {
  const [tweets, setTweets] = useState([]);
  const [user, setUser] = useState();
  const [follow, setFollow] = useState(false);
  const { profileId } = useParams();
  const getUserData = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/users/${profileId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + document.cookie.split("=")[1],
        },
      }
    );
    const data = await response.json();
    if (!data.error) {
      setUser(data.getUser);
      if(data.getUser.followers.includes(JSON.parse(localStorage.getItem('user_data'))?._id)){
        setFollow(true)
      }
    }
  };
  const getAllTweets = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/tweets/displayAllTweets`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + document.cookie.split("=")[1],
        },
      }
    );
    const data = await response.json();
    if (!data.error) {
      setTweets(data.allTweets);
    }
  };
  const followUser = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/users/follow`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + document.cookie.split("=")[1],
        },
        body: JSON.stringify({
          userId: profileId,
        }),
      }
    );
    const data = await response.json();
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success(data.message);
      setFollow(true);
    }
  };
  const unfollowUser = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/users/unfollow`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + document.cookie.split("=")[1],
        },
        body: JSON.stringify({
          userId: profileId,
        }),
      }
    );
    const data = await response.json();
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success(data.message);
      setFollow(false);
    }
  };
  useEffect(() => {
    getUserData();
    getAllTweets();
  }, [follow]);
  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <div className="bg-black w-full min-h-screen text-white p-6 ml-[16rem]">
        <div className="mt-10">
          <img
            className="inline-block h-36 w-36 rounded-full"
            src={user?.profilePic}
            alt="profile pic"
          />

          <h1 className="mt-10 font-bold text-2xl">{user?.userName}</h1>
          {!follow ? (
            <button
              className="flex mt-5 items-center px-10 py-[0.5rem] bg-blue-400 text-white font-bold text-xl rounded-full"
              onClick={() => followUser()}
            >
              Follow
            </button>
          ) : (
            <button
            onClick={()=>unfollowUser()}
             className="flex mt-5 items-center px-10 py-[0.5rem] bg-black border-2 border-solid border-white text-white font-bold text-xl rounded-full">
              Unfollow
            </button>
          )}
          <p className="mt-5 font-semibold text-lg">
            Joined on 14th October 2022
          </p>
          <p className="mt-5 font-semibold text-lg">
            <b>{user?.following?.length} </b>Following &nbsp; &nbsp;{" "}
            <b>{user?.followers?.length} </b>Followers
          </p>
        </div>
        <div className="MyTweets">
          <h1 className="mt-10 font-bold text-2xl">Tweets Posted</h1>
          {tweets
            ?.filter((tweet) => tweet?.postedBy?.userName === user?.userName)
            ?.map((userTweet) => (
              <TweetCard tweet={userTweet} />
            ))}
        </div>
      </div>
    </>
  );
}

export default UserProfile;
