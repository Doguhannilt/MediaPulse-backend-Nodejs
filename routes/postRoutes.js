import express from 'express'
import { createPost, deletePost, getAllPosts, getPost, likeAndUnLikePost, replyPost } from '../controller/postController.js'
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

// postController\replyPost
router
    .post('/reply/:id', protectedRoute, replyPost)

router
    .get('/getFeeds', protectedRoute, getAllPosts)

    
export default router