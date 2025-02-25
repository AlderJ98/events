import bcrypt from 'bcrypt'
import User from "../models/user.js"
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'

const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { first_name, last_name, email, password, role_id } = req.body

    try {
        const existingUser = await User.findOne({
            where: {
                email: email
            }
        })

        if (existingUser) return res.status(400).json({ success: false, message: 'El usuario ya existe'})
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        await User.create({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            role_id
        })

        res.status(201).json({
            success: true,
            message: `Usuario creado satisfactoriamente`
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear el usuario'
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({
        where: {
            email: email
        }
    })

    if (!user) return res.status(404).json({ success: false, message: 'Usuario y/o contraseña incorrectos'})

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(400).json({ success: false, message: 'Usuario y/o contraseña incorrectos'})

    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn: '1h', algorithm: 'HS512' })

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000
    })

    res.status(200).json({
        success: true,
        message: 'Inicio de sesión exitoso'
    })
}

const logout = (req, res) => {
    res.clearCookie('token')

    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'strict',
        expires: new Date(0),
    })

    res.status(200).json({
        success: true,
        message: 'Cierre de sesión exitoso'
    })
}

export { register, login, logout }