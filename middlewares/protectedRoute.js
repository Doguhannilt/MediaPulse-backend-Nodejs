import User from "../models/userModel.js"
import jwt from 'jsonwebtoken'
const protectedRoute = async (req, res, next) => {
    try {
        
    
    const token = req.cookies.jwt

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (!decoded) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const user = await User.findById(decoded.userId).select('-password')
    req.user = user
    next()

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export default protectedRoute