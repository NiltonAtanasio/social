import { Router } from 'express'
const router = Router()
import userControllers from '../controllers/userController.js'
import { validId, validUser } from '../middlewares/golbal.middlewares.js'

router.post('/', userControllers.create)
router.get('/', userControllers.findAll)
router.get('/:id', validId, validUser, userControllers.findById)
router.patch('/:id', validId, validUser, userControllers.update)

export default router