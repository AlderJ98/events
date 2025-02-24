// import bcrypt from 'bcryptjs'
// import User from '../models/userModel.js'

// export const createUser = async (req, res) => {
//     const { first_name, last_name, email, password } = req.body

//     try {
//         const existingUser = await User.findOne({ where: { email } })
//         if (existingUser) {
//             return res.status(400).json({ message: 'El usuario ya existe' })
//         }

//     } catch (error) {
//         console.error(error)
//     }