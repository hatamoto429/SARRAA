import { db } from '../connectdb.js'

/* === DEMO MODELS: Vulnerable with Safe Version Below === */

//  getUserProfile (vulnerable to SQLi)
export const getUserProfile = (username, password, callback) => {
  console.log('Username input:', username)
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`

  console.log('Executing query:', query)
  db.query(query, callback)
}

/* Safe version:
export const getUserProfile = (username, callback) => {
  // Safe: parameterized query → prevents SQL Injection
  const query = 'SELECT * FROM users WHERE username = ?'
  db.query(query, [username], callback)
}
*/

// loadUserData (only username dependent from local store)
export const loadUserData = (username, callback) => {
  const query = 'SELECT * FROM users WHERE username = ?'
  db.query(query, [username], callback)
}

/*
safe load user data
*/

//  createUser (vulnerable to SQLi)
export const createUser = (username, password, callback) => {
  // Vulnerable: direct string concatenation → SQL Injection possible
  const query = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`
  db.query(query, callback)
}

/* Safe version:
export const createUser = (username, password, callback) => {
  // Safe: parameterized query → prevents SQL Injection
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)'
  db.query(query, [username, password], callback)
}
*/

//  updateUserProfile (vulnerable to SQLi)
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
  for (const field of allowedFields) {
    if (field in updatedData) {
      const value = updatedData[field] || null
      updates.push(`${field} = '${value}'`)
    }
  }
  if (updates.length === 0) {
    return callback(null, { message: 'No fields to update' })
  }
  const query = `UPDATE users SET ${updates.join(', ')} WHERE username = '${username}'`
  db.query(query, callback)
}

/* Safe version:
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
      values.push(updatedData[field] || null)
    }
  }
  if (updates.length === 0) {
    return callback(null, { message: 'No fields to update' })
  }
  const query = `UPDATE users SET ${updates.join(', ')} WHERE username = ?`
  values.push(username)
  db.query(query, values, callback)
}
*/
