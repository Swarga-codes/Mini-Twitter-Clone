const USER=require('../models/user')
const jwt=require('jsonwebtoken')
const authorization=async(req,res,next)=>{
    try{
        const {authorization}=req.headers
        if(!authorization) return res.status(403).json({error:'Could not authorize'})
        const token=authorization.replace("Bearer ","")
        if(!token) return res.status(404).json({error:'Token not found, login again'})
        const checkToken=await jwt.verify(token,process.env.SECRET_KEY)
        if(!checkToken) return res.status(403).json({error:'Token invalid'})
        if (checkToken.exp < Date.now() / 1000) {
            return res.status(401).json({error:'Token has expired,log in again.'});
          }
        const {_id}=checkToken
        const userdata=await USER.findById(_id)
     
            req.user=userdata
            next()
    }
    catch(error){
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired, Please login' });
          }
          return res.status(500).json({message:'Internal server error'})
    }
}

module.exports={authorization}