import User from '../models/userModel.js'
import Post from '../models/postModel.js'

export const createPost = async (req, res) => {
    try {
        const { postedBy, text, img } = req.body

        if (!postedBy || !text) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        if (text.length < 5 && text.length > 0 && text.length !== 0) {
            return res.status(400).json({ message: 'Text must be at least 5 characters' })
        }

        const user = await User.findById(postedBy)
        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }

        if (user._id.toString() === req.user._id.toString()) {
            return res.status(400).json({ message: 'You cannot post on your profile' })
        }

        const newPost = new Post({
            postedBy,
            text,
            img
        })

        const savedPost = await newPost.save()

        res.status(201).json(savedPost)

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
        console.log(error)
    }
}

export const getPost = async (req, res) => {
    try {
        const { postId } = req.params

        const post = await Post.findById(postId)
        if (!post) {
            return res.status(400).json({ message: 'Post not found' })
        }

        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
        console.log(error)
    }
}

export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params
        const post = await Post.findByIdAndDelete(postId)
        if (!post) {
            return res.status(400).json({ message: 'Post not found' })
        }

        if (post.postedBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        res.status(200).json({ message: 'Post deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
        console.log(error)
    }
}

export const likeAndUnLikePost = async (req, res) => {
    try {
        const { id: postId } = req.params
        const userId = req.user._id

        const post = await Post.findById(postId)
        if (!post) {
            return res.status(400).json({ message: 'Post not found' })
        }

        const userLikedPost = post.likes.includes(userId)

        if (userLikedPost) {
            await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } }, { new: true })
            res.status(200).json({ message: 'Post unliked successfully' })
        } else {
            await Post.findByIdAndUpdate(postId, { $push: { likes: userId } }, { new: true })
            res.status(200).json({ message: 'Post liked successfully' })
        }


    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
        console.log(error)
    }
}

export const replyPost = async (req, res) => {
    try {
        const { text } = req.body
        const { id: postId } = req.params
        const userId = req.user._id
        const userProfilePic = req.user.profilePic
        const username = req.user.username

        if(!text) {
            return res.status(400).json({ message: 'Text is required' })
        }

        if(text.length < 5 && text.length > 0 && text.length !== 0) {
            return res.status(400).json({ message: 'Text must be at least 5 characters' })
        }

        const post = await Post.findById(postId)

        if(!post) {
            return res.status(400).json({ message: 'Post not found' })
        }   

        const newReply = {
            text,
            postedBy: userId,
            userProfilePic,
            username
        }

        post.replies.push(newReply)
        await post.save()

        res.status(200).json({ message: 'Reply posted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
        console.log(error)
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const userId = req.user._id
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }

        const following = user.following
        const feedPosts = await Post.find({ postedBy: { $in: following } })


        res.status(200).json(feedPosts)
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
        console.log(error)
    }
}