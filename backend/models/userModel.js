import { db } from '../connect.js'

export const findUserByUsername = (username, callback) => {
  const query = 'SELECT * FROM users WHERE username = ?' // safer
  db.query(query, [username], callback)
}

export const createUser = (username, password, callback) => {
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)'
  db.query(query, [username, password], callback)
}

export const getUserDataById = (userId, callback) => {
  const query = `SELECT * FROM users WHERE id = ${userId}` // Vulnerable again
  db.query(query, callback)
}
