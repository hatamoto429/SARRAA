import express from 'express'
import { fetchUserProfile, saveUserProfile } from '../controllers/userController.js'

const router = express.Router()

router.get('/profile/:username', fetchUserProfile)
router.put('/profile/:username', saveUserProfile)

export default router
