import { db } from '../connectdb.js'

/* === DEMO PRODUCT MODELS: Vulnerable with Safe Version Below === */

//  getProduct (vulnerable to SQLi)
export const getProduct = (name, callback) => {
  // Vulnerable: direct string concatenation → SQL Injection possible
  const query = `SELECT * FROM products WHERE name = '${name}'`
  db.query(query, callback)
}

/* Safe version:
export const getProduct = (name, callback) => {
  // Safe: parameterized query → prevents SQL Injection
  const query = 'SELECT * FROM products WHERE name = ?'
  db.query(query, [name], callback)
}
*/

// Vulnerable fetch all products (no user input, so no injection risk here)
export const getAllProducts = (callback) => {
  const query = 'SELECT * FROM products'
  db.query(query, callback)
}

/* Safe version (functionally same for fetch all, but consistent):
export const getAllProducts = (callback) => {
  const query = 'SELECT * FROM products'
  db.query(query, [], callback)
}
*/

//  createProduct (vulnerable to SQLi)
export const createProduct = (productData, callback) => {
  const { name, price, description, stock } = productData
  // Vulnerable: direct string concatenation → SQL Injection possible
  const query = `
    INSERT INTO products (name, price, description, stock)
    VALUES ('${name}', '${price}', '${description}', '${stock}')
  `
  db.query(query, callback)
}

/* Safe version:
export const createProduct = (productData, callback) => {
  const { name, price, description, stock } = productData
  // Safe: parameterized query → prevents SQL Injection
  const query = 'INSERT INTO products (name, price, description, stock) VALUES (?, ?, ?, ?)'
  db.query(query, [name, price, description, stock], callback)
}
*/

//  updateProduct (vulnerable to SQLi)
export const updateProduct = (productId, updatedData, callback) => {
  const allowedFields = ['name', 'price', 'description', 'stock']
  const updates = []
  for (const field of allowedFields) {
    if (field in updatedData) {
      const value = updatedData[field] || null
      updates.push(`${field} = '${value}'`)
    }
  }
  if (updates.length === 0) {
    return callback(null, { message: 'No fields to update' })
  }
  // Vulnerable: direct string concatenation → SQL Injection possible
  const query = `UPDATE products SET ${updates.join(', ')} WHERE id = ${productId}`
  db.query(query, callback)
}

/* Safe version:
export const updateProduct = (productId, updatedData, callback) => {
  const allowedFields = ['name', 'price', 'description', 'stock']
  const updates = []
  const values = []
  for (const field of allowedFields) {
    if (field in updatedData) {
      updates.push(`${field} = ?`)
      values.push(updatedData[field] || null)
    }
  }
  if (updates.length === 0) {
    return callback(null, { message: 'No fields to update' })
  }
  const query = `UPDATE products SET ${updates.join(', ')} WHERE id = ?`
  values.push(productId)
  db.query(query, values, callback)
}
*/
