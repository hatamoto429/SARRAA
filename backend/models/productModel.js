import { db } from '../connectdb.js'

export const getProduct = (name, callback) => {
  const query = 'SELECT * FROM products WHERE name = ?'
  db.query(query, [name], callback)
}

// OPTIONAL GET PRODUCT BY ID

// OPTIONAL UPDATE PRODUCT

// OPTIONAL CREATE PRODUCT
