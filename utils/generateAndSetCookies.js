import jwt from 'jsonwebtoken'
const generateAndSetCookies = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d',
    })
    res.cookie('jwt', token, {
        httpOnly: true, // for security
        secure: true, // for production
        sameSite: 'strict', // for production - CSRF protection [CSRF: Cross-Site Request Forgery]
    })

    return token
}


export default generateAndSetCookies