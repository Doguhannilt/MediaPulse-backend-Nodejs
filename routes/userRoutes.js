import express from 'express'

// Controllers
import { signupUser } from '../controller/userController.js'

const router = express()

// users/signup ENDPOINT
router
    .post('/signup', signupUser  )
    



export default router