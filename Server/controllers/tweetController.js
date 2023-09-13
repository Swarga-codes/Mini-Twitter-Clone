const TWEET = require("../models/tweet")

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

module.exports={createTweet}