import { getUserProfile, createUser } from '../models/userModel.js'
import { compare, genSalt, hash } from 'bcryptjs'
import { checkIfUsernameExists } from '../utils/dbutils.js'

/* === VULNERABLE LOGIN === */
export const loginUser = (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' })
  }

  getUserProfile(username, password, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' })
    if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' })
    // VULNERABLE - RETURN ARRAY OF RESULTS; ALLOWS FOR UNLIMITED RETURNING OF RESULTS
    return res.status(200).json({ message: 'Login successful', users: results })
  })
}

/* SAFE LOGIN
export const loginUser = (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' })
  }

  getUserProfile(username, async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' })
    if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' })

    const user = results[0]

    const isHashed =
      user.password.startsWith('$2a$') ||
      user.password.startsWith('$2b$') ||
      user.password.startsWith('$2y$')

    try {
      const match = isHashed ? await compare(password, user.password) : password === user.password

      if (!match) {
        return res.status(401).json({ message: 'Invalid credentials' })
      }

      return res.status(200).json({ message: 'Login successful', user })
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.message })
    }
  })
}
*/

/* === VULNERABLE REGISTER === */
export const registerUser = (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' })
  }

  checkIfUsernameExists(username, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' })
    if (results.length > 0) return res.status(400).json({ message: 'Username already exists' })

    createUser(username, password, (err) => {
      if (err) return res.status(500).json({ message: 'Registration failed' })
      return res.status(201).json({ message: 'User registered successfully (vulnerable)' })
    })
  })
}

/* SAFE REGISTER
export const registerUser = (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' })
  }

  checkIfUsernameExists(username, async (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' })
    if (results.length > 0) return res.status(400).json({ message: 'Username already exists' })

    try {
      const salt = await genSalt(10)
      const hashedPassword = await hash(password, salt)

      createUser(username, hashedPassword, (err) => {
        if (err) return res.status(500).json({ message: 'Registration failed' })
        return res.status(201).json({ message: 'User registered successfully (safe)' })
      })
    } catch (error) {
      return res.status(500).json({ message: 'Error hashing password', error: error.message })
    }
  })
}
*/
