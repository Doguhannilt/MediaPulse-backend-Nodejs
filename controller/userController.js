import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import generateAndSetCookies from '../utils/generateAndSetCookies.js';


export const signupUser = async (req, res) => {

    try {
        const { name, username, email, password } = req.body;

        if (!name || !username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        if (name.length < 5 && name.length > 0) {
            return res.status(400).json({ message: 'Name must be at least 3 characters' })
        }

        if (username.length < 5 && username.length > 0) {
            return res.status(400).json({ message: 'Username must be at least 5 characters' })
        }

        if (password.length < 5 && password.length > 20 && password.length !== 0) {
            return res.status(400).json({ message: 'Password must be between 5 and 20 characters' })
        }

        if (!email.includes('@')) {
            return res.status(400).json({ message: 'Invalid email' })
        }


        const user = await User.findOne({
            $or:
                [
                    { username: username },
                    { email: email }
                ]
        })


        if (user) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt)


        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword
        })




        await newUser.save()

        if (newUser) {

            generateAndSetCookies(newUser._id, res)
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                username: newUser.username,
                email: newUser.email,
            })
        } else {
            res.status(400).json({ message: 'Invalid user data' })
        }



    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }



}


export const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) { return res.status(400).json({ message: 'All fields are required' }) }

        const user = await User.findOne({ email })

        if (!user) { return res.status(400).json({ message: 'User does not exist' }) }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) { return res.status(400).json({ message: 'Invalid credentials' }) }

        // Generate and set cookies
        generateAndSetCookies(user._id, res)

        res.status(200).json({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie('jwt')
        res.status(200).json({ message: 'Logged out successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const followUser = async (req, res) => {
    try {
        const { id } = req.params
        // ID's of the users
        const userToFollow = await User.findById(id)
        const currentUser = await User.findById(req.user._id)

        if(id === req.user._id) {
            return res.status(400).json({ message: 'You cannot follow yourself' })
        }

        if(!userToFollow || !currentUser) {
            return res.status(400).json({ message: 'User not found' })
        }

        const isFollowing = currentUser.following.includes(id)

        if(isFollowing) {
            await User.findByIdAndUpdate( req.user._id,  {$pull: { following: id }}, {new: true})
            await User.findByIdAndUpdate( id,  {$pull: { followers: req.user._id }}, {new: true})
            return res.status(200).json({ message: 'User unfollowed successfully' })
        } else {
            await User.findByIdAndUpdate( req.user._id,  {$push: { following: id }}, {new: true})
            await User.findByIdAndUpdate( id,  {$push: { followers: req.user._id }}, {new: true})
            return res.status(200).json({ message: 'User followed successfully' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
        console.log(error)
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const { name, username, email, profilePic, bio } = req.body
        const user = await User.findById(id)

        if(req.params.id !== req.user._id) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        if(!user) {
            return res.status(400).json({ message: 'User not found' })
        }
        if(name) {
            user.name = name
        }
        if(username) {
            user.username = username
        }
        if(email) {
            user.email = email
        }
        if(profilePic) {
            user.profilePic = profilePic
        }
        if(bio) {
            user.bio = bio
        }
        await user.save()
        res.status(200).json({ message: 'User updated successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
        console.log(error)
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id).select('-password')
        if(!user) {
            return res.status(400).json({ message: 'User not found' })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
        console.log(error)
    }
}

