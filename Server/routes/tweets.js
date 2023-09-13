const express=require('express')
const {authorization} = require('../middlewares/authorization')
const { createTweet, displayAllTweets, deleteTweet } = require('../controllers/tweetController')
const router=express.Router()

router.post('/createTweet',authorization,createTweet)
router.get('/displayAllTweets',authorization,displayAllTweets)
router.delete('/delete/:tweetId',authorization,deleteTweet)

module.exports=router