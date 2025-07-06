import express from 'express'
import { fetchProduct } from '../controllers/productController.js'

const router = express.Router()

/* === PRODUCT ROUTES === */

// Vulnerable or safe product fetch (toggle by commenting/uncommenting inside controller)
router.get('/:name', fetchProduct)

export default router
