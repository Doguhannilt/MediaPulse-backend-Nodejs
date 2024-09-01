import express from 'express'

// Controllers
import { followUser, getUserProfile, loginUser, logoutUser, signupUser, unfollowUser, updateUser } from '../controller/userController.js'
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

// users/follow ENDPOINT
router
    .post('/follow/:id', protectedRoute, followUser)

// users/unfollow ENDPOINT
router
    .post("/update/:id", protectedRoute, updateUser)

router
    .get("/profile/:id", protectedRoute, getUserProfile)
export default router