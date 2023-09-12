const express=require('express')
const app=express()
const PORT=process.env.PORT || 5000
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()
const userAuth=require('./routes/userAuth')
app.use(express.json())
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on('connected',()=>{
    console.log('Connected to mongodb')
})
mongoose.connection.on('error',()=>{
    console.log('Could not connect to mongodb')
})
app.get('/',(req,res)=>{
    res.send('<h1>Welcome to Mini Twitter Backend</h1>')
})

app.use('/api/auth',userAuth);
app.listen(PORT,(req,res)=>{
    console.log(`Server is listening to ${PORT}`)
})