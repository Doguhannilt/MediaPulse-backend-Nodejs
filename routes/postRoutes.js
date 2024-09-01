import express from 'express'
import { createPost, deletePost, getPost } from '../controller/postController.js'
import protectedRoute from '../middlewares/protectedRoute.js'

const router = express.Router()

router
    .post('/create', protectedRoute, createPost)

router
    .get('/:postId', protectedRoute, getPost)

router
    .delete('/delete/:postId', protectedRoute, deletePost)
export default router