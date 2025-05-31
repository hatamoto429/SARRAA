import express from 'express'
import { fetchProduct } from '../controllers/productController.js'

const router = express.Router()

router.get('/:name', fetchProduct)

export default router
