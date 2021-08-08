import { Router } from 'express'
import authController from '../controllers/auth.controller'

const router: Router = Router()

/** '/auth' Routes **/
router.post('/login', authController.login)
router.post('/sign-up', authController.signUp)

export default router
