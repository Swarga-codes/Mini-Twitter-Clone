const express=require('express')
const { authorization } = require('../middlewares/authorization')
const router=express.Router()
const {getUserData,followUser, unfollowUser, followingTweets}=require('../controllers/userController')
router.get('/following/tweets',authorization,followingTweets)
router.get('/:userId',authorization,getUserData)
router.patch('/follow',authorization,followUser)
router.patch('/unfollow',authorization,unfollowUser)

module.exports=router