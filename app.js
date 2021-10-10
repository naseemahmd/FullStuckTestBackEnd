import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose'
import usersRouter from './Routes/user.js'
import postRouter from './Routes/post.js'
import commentRouter from './Routes/comment.js'
import dotenv from 'dotenv'

dotenv.config()

//Create Express App
const app = express()

//Middlewares
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONAL')
  res.setHeader('Access-Control-Allow-Header', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(helmet.xssFilter())
app.use(helmet.hidePoweredBy())
app.use(helmet.noSniff())
app.use(cors())

//routes
app.use('/user', usersRouter)
app.use('/post', postRouter)
app.use('/commnet', commentRouter)

//Home
app.get('/', (req, res) => {
  const responce = '<p>Hello There! <br> This is backend URL please find the correct path to get Data <br>Thank You </p>'
  res.send(responce)
})

// DB CONNECT
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  //Start the Server
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
  })
}).catch(err => {
  throw Error
})
