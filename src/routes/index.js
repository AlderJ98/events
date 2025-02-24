import express from 'express'
import roleController from '../controllers/roleController.js'

const router = express.Router();

router.get('/role', roleController.getRoles)
router.post('/createRole', roleController.createRole)
router.put('/updateRole:/id', roleController.updateRole)
router.delete('/deleteRole/:id', roleController.deleteRole)

export default router
