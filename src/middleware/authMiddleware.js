import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) return res.status(401).json({ success: false, message: 'Acceso no autorizado'})

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ success: false, message: 'Acceso no autorizado'})
        req.userId = decoded.id
        next()
    })
}

export default authMiddleware