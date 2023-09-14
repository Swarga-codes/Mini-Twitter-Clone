const TWEET = require("../models/tweet");
const USER = require("../models/user")

//Get user data of particular user
const getUserData=async(req,res)=>{
    const userId=req.params.userId
    try {
        const getUser = await USER.findOne({ _id: userId }, '-password');
    
        if (!getUser) return res.status(404).json({ error: 'User not found' });
    
        return res.status(200).json({ getUser });
      } catch (error) {
        console.error('Error retrieving user data:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }
}

//Follow user
 const followUser=async(req,res)=>{
    const {userId}=req.body
    try{
    if(!userId) return res.status(400).json({error:'User id cannot be empty'})
    if(userId==req.user._id) return res.status(422).json({error:'User cannot follow self account'})
    const isFollowing=await USER.findById(req.user._id)
    if(isFollowing.following.includes(userId)) return res.status(409).json({error:'User already followed'})
    const updateFollowing=await USER.findByIdAndUpdate(req.user._id,{$push:{following:userId}},{new:true})
    if(!updateFollowing) return res.status(500).json({error:'Could not update following'})
    const updateFollowers=await USER.findByIdAndUpdate(userId,{$push:{followers:req.user._id}},{new:true})
    if(!updateFollowers) return res.status(500).json({error:'Could not update followers'})
return res.status(200).json({message:'User followed successfully'})
    }
    catch(error){
        return res.status(500).json({error:'Internal Server Error'})
    }
}

//Unfollow user
const unfollowUser=async(req,res)=>{
    const {userId}=req.body
    try{
    if(!userId) return res.status(400).json({error:'User id cannot be empty'})
    if(userId==req.user._id) return res.status(422).json({error:'User cannot unfollow self account'})
    const isFollowing=await USER.findById(req.user._id)
    if(!isFollowing.following.includes(userId)) return res.status(409).json({error:'User already unfollowed'})
    const updateFollowing=await USER.findByIdAndUpdate(req.user._id,{$pull:{following:userId}},{new:true})
    if(!updateFollowing) return res.status(500).json({error:'Could not update following'})
    const updateFollowers=await USER.findByIdAndUpdate(userId,{$pull:{followers:req.user._id}},{new:true})
    if(!updateFollowers) return res.status(500).json({error:'Could not update followers'})
return res.status(200).json({message:'User unfollowed successfully'})
    }
    catch(error){
        return res.status(500).json({error:'Internal server error'})
    }
}

//following tweets of current user
const followingTweets=async(req,res)=>{
    try{
    const findUser=await USER.findById(req.user._id).sort({_id:-1})
    if(!findUser) return res.status(404).json({error:'User not found'})
    const getTweets=await TWEET.find({postedBy:{$in:req.user.following}}).populate('postedBy','userName')
    if(getTweets.length===0) return res.status(500).json({error:'Could not fetch tweets'})
    return res.status(200).json({getTweets})
    }
    catch(error){
        return res.status(500).json({error:'Internal server error'})
    }
}
module.exports={getUserData,followUser,unfollowUser,followingTweets}