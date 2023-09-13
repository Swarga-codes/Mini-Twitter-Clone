const express=require('express')
const {authorization} = require('../middlewares/authorization')
const { createTweet } = require('../controllers/tweetController')
const router=express.Router()

router.post('/createTweet',authorization,createTweet)

module.exports=router