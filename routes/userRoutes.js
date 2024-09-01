import express from 'express'

// Controllers
import { followUser, loginUser, logoutUser, signupUser, unfollowUser, updateUser } from '../controller/userController.js'
import protectedRoute from '../middlewares/protectedRoute.js'

const router = express()

// users/signup ENDPOINT
router
    .post('/signup', signupUser)


// users/login ENDPOINT
router
    .post('/login', loginUser)


// users/logout ENDPOINT
router
    .post('/logout', logoutUser)

router
    .post('/follow/:id', protectedRoute, followUser)

router
    .post("/update/:id", protectedRoute, updateUser)

export default router