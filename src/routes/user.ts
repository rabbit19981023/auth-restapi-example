import { Router } from 'express'
import userController from '../controllers/user'

const router = Router()

/** '/users' Routes **/
router.get('/', userController.getAll)
router.post('/login', userController.login)
router.post('/register', userController.register)

export default router
