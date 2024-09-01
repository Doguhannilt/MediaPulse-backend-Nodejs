import User from '../models/userModel.js'
import Post from '../models/postModel.js'

export const createPost = async (req, res) => {
    try {
        const {postedBy, text, img} = req.body

        if(!postedBy || !text) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        if(text.length < 5 && text.length > 0 && text.length !== 0) {
            return res.status(400).json({ message: 'Text must be at least 5 characters' })
        }

        const user = await User.findById(postedBy)
        if(!user) {
            return res.status(400).json({ message: 'User not found' })
        }

        if(user._id.toString() === req.user._id.toString()) {
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