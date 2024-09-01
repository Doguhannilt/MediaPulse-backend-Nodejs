import express from 'express'
import { createPost, deletePost, getPost, likeAndUnLikePost } from '../controller/postController.js'
import protectedRoute from '../middlewares/protectedRoute.js'

const router = express.Router()

// postController\createPost
router
    .post('/create', protectedRoute, createPost)

// postController\getPost
router
    .get('/:postId', protectedRoute, getPost)

// postController\deletePost
router
    .delete('/delete/:postId', protectedRoute, deletePost)

// postController\likeAndUnLikePost
router
    .post('/like/:id', protectedRoute, likeAndUnLikePost)

    
export default router