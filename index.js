import express from 'express'

// Routes
import userRoutes from './routes/userRoutes.js'

// Database Connection
import connectDB from './models/connection/connection.js'

// Express Config
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'



// Express Config
const app = express()


// Env Config
dotenv.config()

// Database Connection
connectDB()


// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


// Routes
app.use('/users', userRoutes)


// Server Listen
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})