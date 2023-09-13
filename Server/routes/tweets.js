const express=require('express')
const {authorization} = require('../middlewares/authorization')
const router=express.Router()

router.get('/createTweet',authorization,(req,res)=>{
    res.json({message:'I am authorized'})
})

module.exports=router