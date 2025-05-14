import { genSalt, hash, compare } from 'bcryptjs'
import { db } from '../connect.js'

export const hashPassword = async (password) => {
  const salt = await genSalt(10)
  return await hash(password, salt)
}

export const checkPassword = async (inputPassword, hashedPassword) => {
  return await compare(inputPassword, hashedPassword)
}

// Optional: dangerously allow rendering unescaped data for XSS demo
export const renderRawHtml = (content) => {
  return `<div>${content}</div>` // no escaping on purpose
}

export const checkIfUsernameExists = (username, callback) => {
  const query = 'SELECT * FROM users WHERE username = ?'
  db.query(query, [username], (err, results) => {
    if (err) return callback(err, null)
    return callback(null, results)
  })
}
