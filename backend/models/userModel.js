import { db } from '../connect.js'

export const getUserProfile = (username, callback) => {
  const query = 'SELECT * FROM users WHERE username = ?'
  db.query(query, [username], callback)
}

export const getUserByID = (userId, callback) => {
  const query = `SELECT * FROM users WHERE id = ${userId}`
  db.query(query, callback)
}

export const updateUserProfile = (username, updatedData, callback) => {
  const allowedFields = [
    'full_name',
    'email',
    'phone_number',
    'date_of_birth',
    'shipping_address',
    'bank_account_number',
    'credit_card_number',
    'paypal_info',
    'wallet_amount',
    'wallet_password',
  ]

  const updates = []
  const values = []

  for (const field of allowedFields) {
    if (field in updatedData) {
      updates.push(`${field} = ?`)
      values.push(updatedData[field] || null) // fallback to null
    }
  }

  if (updates.length === 0) {
    return callback(null, { message: 'No fields to update' })
  }

  const query = `
    UPDATE users
    SET ${updates.join(', ')}
    WHERE username = ?
  `
  values.push(username) // add username to the end for WHERE clause

  db.query(query, values, callback)
}

export const createUser = (username, password, callback) => {
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)'
  db.query(query, [username, password], callback)
}
