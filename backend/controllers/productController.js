import { getProduct } from '../models/productModel.js'

export const fetchProduct = (req, res) => {
  const { name } = req.params

  try {
    getProduct(name, (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' })
      if (results.length === 0) return res.status(404).json({ message: 'Product not found' })

      res.status(200).json(results[0])
    })
  } catch (error) {
    console.error('fetchProductByName failed:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
