import { Router } from 'express'
import userRoute from './user'

const router = Router()

router.use('/users', userRoute)

export default router
