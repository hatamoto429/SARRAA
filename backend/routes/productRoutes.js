import express from 'express'
import {
  fetchProduct,
  fetchAllProducts,
  createNewProduct,
} from '../controllers/productController.js'

const router = express.Router()

/* === PRODUCT ROUTES === */

// Vulnerable or safe product fetch (toggle by commenting/uncommenting inside controller)
router.get('/:name', fetchProduct)

// Vulnerable or safe product fetch (toggle by commenting/uncommenting inside controller)
router.get('/', fetchAllProducts)

// Vulnerable post new product
router.post('/', createNewProduct)

export default router
