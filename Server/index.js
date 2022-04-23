const express=require('express')
const cors=require('cors')
require('dotenv').config()
const {errorHandler}=require('./middleware/errorMiddleware')
const connectDB=require('./config/db')

const app=express()

app.use(cors({origin:'https://exposure.ayushvyas.in'}))
app.use(express.json({limit: '30mb',extended:true}))
app.use(express.urlencoded({limit: '30mb',extended:true}))

app.use('/posts',require('./routes/posts'))
app.use('/user',require('./routes/user'))

app.get('/',(req,res)=>{
    res.send("welcome to the app")
})
app.use(errorHandler)

const PORT=process.env.PORT || 3000

const start=async()=>{
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT,()=>{
        console.log('Server is listening on port '+PORT);
    })
}


start()