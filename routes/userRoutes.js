import express from 'express'

// Controllers
import { loginUser, logoutUser, signupUser } from '../controller/userController.js'

const router = express()

// users/signup ENDPOINT
router
    .post('/signup', signupUser  )


// users/login ENDPOINT
router
    .post('/login', loginUser  )
    

// users/logout ENDPOINT
router
    .post('/logout', logoutUser)



export default router