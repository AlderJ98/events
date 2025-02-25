import express from 'express'
import rateLimit from 'express-rate-limit'
import { check } from 'express-validator'
import authMiddleware from '../middleware/authMiddleware.js'
import { getRoles, createRole, updateRole, deleteRole } from '../controllers/roleController.js'
import { register, login, logout } from '../controllers/authController.js'

const router = express.Router();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Demasiados intentos de inicio de sesión. Inténtalo más tarde."
})

router.post('/register', [
    check('first_name', 'El nombre es requerido').not().isEmpty(),
    check('last_name', 'El apellido es requerido').not().isEmpty(),
    check('email', 'El email es requerido').isEmail(),
    check('password', 'La contraseña es requerida').not().isEmpty(),
    check('role_id', 'El rol es requerido').not().isEmpty(),
], register)
router.post('/login', limiter, login)
router.post('/logout', authMiddleware, logout)

router.get('/role', authMiddleware, getRoles)
router.post('/createRole', authMiddleware, createRole)
router.put('/updateRole/:id', authMiddleware, updateRole)
router.delete('/deleteRole/:id', authMiddleware, deleteRole)

export default router
