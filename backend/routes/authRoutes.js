import express from 'express'
import { loginUser, registerUserPlain, registerUserHashed } from '../controllers/authController.js'

const router = express.Router()

router.post('/login', loginUser)
router.post('/registerplain', registerUserPlain)
router.post('/registerhashed', registerUserHashed)

export default router
