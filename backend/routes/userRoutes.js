import express from 'express'
import { fetchUserProfile, saveUserProfile } from '../controllers/userController.js'

const router = express.Router()

/* === USER PROFILE ROUTES === */

// Vulnerable or safe fetch profile (toggle inside controller)
router.get('/profile/:username', fetchUserProfile)

// Vulnerable or safe update profile (toggle inside controller)
router.put('/profile/:username', saveUserProfile)

export default router
