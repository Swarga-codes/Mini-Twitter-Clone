const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types
const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    followers:[{type:ObjectId,ref:'USER'}],
    following:[{type:ObjectId,ref:'USER'}],
    profilePic:{
        type:String,
        default:'https://i.ibb.co/4pDNDk1/avatar.png'
    }
},{
    timestamps:true
})

const USER=mongoose.model('USER',userSchema)

module.exports=USER