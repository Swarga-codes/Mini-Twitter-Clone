const express=require('express')
const {authorization} = require('../middlewares/authorization')
const { createTweet, displayAllTweets } = require('../controllers/tweetController')
const router=express.Router()

router.post('/createTweet',authorization,createTweet)
router.get('/displayAllTweets',authorization,displayAllTweets)

module.exports=router