const express=require('express')
const app=express()
const PORT=process.env.PORT || 5000
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()
const userAuth=require('./routes/userAuth')
const tweets=require('./routes/tweets')
const users=require('./routes/users')
const cors=require('cors')
app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173",
    "http://127.0.0.1:5173","mini-twitter-clone-2imdbcl5t-swarga-codes.vercel.app","https://mini-twitter-clone-six.vercel.app"]
    ,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
}))
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
app.use('/api/tweets',tweets);
app.use('/api/users',users);
app.listen(PORT,(req,res)=>{
    console.log(`Server is listening to ${PORT}`)
})