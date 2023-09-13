const USER=require('../models/user')
const bcrypt=require('bcrypt')
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const jwt=require('jsonwebtoken')
//----------Registering User----------//
const registerUser=async(req,res)=>{
const {userName,password}=req.body
if(!userName || !password){
    return res.status(400).json({error:'Please include all the fields'})
}
const isExistingUser=await USER.findOne({userName:userName})
if(isExistingUser) return res.status(409).json({error:'User already registered'})

const hashedPassword=await bcrypt.hash(password,parseInt(process.env.SALT_ROUNDS))
if(!hashedPassword) return res.status(500).json({error:'Could not hash password'})

const newUser=new USER({
    userName,
    password:hashedPassword
})

const register=await newUser.save()
if(!register) return res.status(500).json({error:'Could not register user....'})

return res.status(200).json({message:'User registered successfully'})
}

//----------Login User----------//
const loginUser=async(req,res)=>{
    const {userName,password}=req.body
    if(!userName || !password){
        return res.status(400).json({error:'Please include all the fields'})
    }
    const isExistingUser=await USER.findOne({userName:userName})
    if(!isExistingUser) return res.status(404).json({error:'User not found'})

    const isMatchingPassword=await bcrypt.compare(password,isExistingUser.password)
    if(!isMatchingPassword) return res.status(401).json({error:'Passwords dont match'})

    const token=await jwt.sign({_id:isExistingUser.id},process.env.SECRET_KEY,{expiresIn:'1d'})
    res.cookie('token',token,{
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), //1 day
        sameSite: "none",
        secure: true,
    })
    const {_id,profilePic}=isExistingUser
    return res.status(200).json({userData:{userName,profilePic,_id},token})
}

//----------Logout User----------//
const logoutUser = async (req, res) => {
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0), 
        sameSite: "none",
        secure: true,
    });
    return res.status(200).json({ message: "Successfully Logged Out"})
};

module.exports={registerUser,loginUser,logoutUser}