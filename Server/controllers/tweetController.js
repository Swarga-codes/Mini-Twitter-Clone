const TWEET = require("../models/tweet")


//----------Create Tweet----------//
const createTweet=async(req,res)=>{
    const {tweetCaption,photo,video}=req.body
    if(!tweetCaption) return res.status(400).json({error:'Please include tweet caption'})
    const newTweet=await new TWEET({
        tweetCaption,
        photo,
        video,
        postedBy:req.user._id
    })

    const saveTweet=await newTweet.save()
    if(!saveTweet) return res.status(500).json({error:'Could not save tweet,try again'})

    return res.status(200).json({message:'Tweet posted successfully'})
}

//----------Display all Tweet----------//
const displayAllTweets=async(req,res)=>{
    const allTweets=await TWEET.find().sort({_id:-1}).populate('postedBy','userName')
if(!allTweets) return res.status(500).json({error:'Could not fetch tweets'})

return res.status(200).json({allTweets})
}

//----------Edit a Tweet----------//
const editTweet=async(req,res)=>{
    const {tweetId,tweetCaption,photo,video}=req.body
    if(!tweetId || !tweetCaption) return res.status(400).json({error:'One or more fields are missing'})
    try{
        const findTweet=await TWEET.findById(tweetId)
        if(!findTweet) return res.status(404).json({error:'Tweet not found'})
        if(findTweet.postedBy.toString()!==req.user._id.toString()) return res.status(401).json({error:'User not authorized to update content'})
        const updateTweet=await TWEET.findByIdAndUpdate(tweetId,{$set:{tweetCaption:tweetCaption,photo,video}})
        if(!updateTweet) return res.status(500).json({error:'Could not update tweet'})
        return res.status(200).json({message:'Tweet Updated Successfully'})
    }
    catch(error){
        return res.status(500).json({error:'Internal server error'})
    }
}

//----------Delete a Tweet----------//
const deleteTweet=async(req,res)=>{
    const tweetId=req.params.tweetId
    try{
        const findTweet=await TWEET.findById(tweetId)
        if(!findTweet) return res.status(404).json({error:'Tweet not found'})
        if(findTweet.postedBy.toString()!==req.user._id.toString()) return res.status(401).json({error:'User not authorized to delete content'})
        const deleteTweet=await TWEET.findByIdAndDelete(tweetId)
        if(!deleteTweet) return res.status(500).json({error:'Could not delete tweet'})
        return res.status(200).json({message:'Tweet deleted successfully'})
    }
    catch(error){
        return res.status(500).json({error:'Internal server error'})
    }
}

module.exports={createTweet,displayAllTweets,editTweet,deleteTweet}