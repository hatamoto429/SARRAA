import express from 'express'
import { loginUser, registerUser } from '../controllers/authController.js'

const router = express.Router()

/* === AUTH ROUTES === */

// Vulnerable or safe login route (toggle by commenting/uncommenting)
router.post('/login', loginUser)

/* To switch to safe version, uncomment this in authController and comment out the other loginUser */

/* === Register route === */

router.post('/register', registerUser)

/* To switch to safe version, uncomment the safe registerUser in authController.js */
export default router
