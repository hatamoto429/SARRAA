import { getProduct, getAllProducts, createProduct, updateProduct } from '../models/productModel.js'

/* === VULNERABLE FETCH PRODUCT === */
export const fetchProduct = (req, res) => {
  const { name } = req.params
  getProduct(name, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' })
    if (results.length === 0) return res.status(404).json({ message: 'Product not found' })
    res.status(200).json(results[0])
  })
}

/* === VULNERABLE FETCH ALL PRODUCTS === */
export const fetchAllProducts = (req, res) => {
  getAllProducts((err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' })
    res.status(200).json(results)
  })
}

/* === VULNERABLE CREATE PRODUCT === */
export const createNewProduct = (req, res) => {
  const productData = req.body
  createProduct(productData, (err) => {
    if (err) return res.status(500).json({ message: 'Database insert error', error: err.message })
    res.status(201).json({ message: 'Product created successfully' })
  })
}

/* === VULNERABLE UPDATE PRODUCT === */
export const updateExistingProduct = (req, res) => {
  const { id } = req.params
  const updatedData = req.body
  updateProduct(id, updatedData, (err) => {
    if (err) return res.status(500).json({ message: 'Database update error', error: err.message })
    res.status(200).json({ message: 'Product updated successfully' })
  })
}
