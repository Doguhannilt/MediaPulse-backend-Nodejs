import express from 'express'

// Controllers
import { loginUser, signupUser } from '../controller/userController.js'

const router = express()

// users/signup ENDPOINT
router
    .post('/signup', signupUser  )


// users/login ENDPOINT
router
    .post('/login', loginUser  )
    



export default router