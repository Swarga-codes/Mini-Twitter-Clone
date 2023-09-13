const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types
const tweetSchema=new mongoose.Schema({
    tweetCaption:{
        type:String,
        required:true
    },
    photo:{
        type:String
    },
    video:{
        type:String
    },
    postedBy:{
        type:ObjectId,
        ref:'USER'
    }
},{
    timestamps:true
})

const TWEET=mongoose.model('TWEET',tweetSchema)

module.exports=TWEET