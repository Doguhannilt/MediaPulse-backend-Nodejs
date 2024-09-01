import express from 'express'
import { createPost, getPost } from '../controller/postController.js'
import protectedRoute from '../middlewares/protectedRoute.js'

const router = express.Router()

router
    .post('/create', protectedRoute, createPost)

router
    .get('/:postId', protectedRoute, getPost)
export default router