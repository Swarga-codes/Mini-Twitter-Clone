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
    const updateFollowing=await USER.findByIdAndUpdate(req.user._id,{$push:{following:userId}},{new:true})
    if(!updateFollowing) return res.status(500).json({error:'Could not update following'})
    const updateFollowers=await USER.findByIdAndUpdate(userId,{$push:{followers:req.user._id}},{new:true})
    if(!updateFollowers) return res.status(500).json({error:'Could not update followers'})
return res.status(200).json({message:'User followed successfully'})
}

//Unfollow user
const unfollowUser=async(req,res)=>{
    const {userId}=req.body
    const updateFollowing=await USER.findByIdAndUpdate(req.user._id,{$pull:{following:userId}},{new:true})
    if(!updateFollowing) return res.status(500).json({error:'Could not update following'})
    const updateFollowers=await USER.findByIdAndUpdate(userId,{$pull:{followers:req.user._id}},{new:true})
    if(!updateFollowers) return res.status(500).json({error:'Could not update followers'})
return res.status(200).json({message:'User followed successfully'})
}
module.exports={getUserData,followUser,unfollowUser}