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