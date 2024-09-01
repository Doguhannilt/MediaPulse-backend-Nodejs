import express from 'express'
import { createPost } from '../controller/postController.js'
import protectedRoute from '../middlewares/protectedRoute.js'

const router = express.Router()

router
    .post('/create',protectedRoute, createPost)

export default router