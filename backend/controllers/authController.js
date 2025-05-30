import { getUserProfile, createUser } from '../models/userModel.js'
import { compare, genSalt, hash } from 'bcryptjs'
import { checkIfUsernameExists } from '../utils/dbutils.js'
import { db } from '../connectdb.js'

export const loginUser = (req, res) => {
  const { username, password } = req.body

  getUserProfile(username, async (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error' })

    if (results.length > 0) {
      const user = results[0]

      // Detect if password is hashed
      const isHashed =
        user.password.startsWith('$2a$') ||
        user.password.startsWith('$2b$') ||
        user.password.startsWith('$2y$')

      let match = false
      if (isHashed) {
        // For hashed passwords, use bcrypt compare
        match = await compare(password, user.password)
      } else {
        // For plain text passwords, do direct string comparison (INTENTIONALLY INSECURE)
        match = password === user.password
      }

      if (match) return res.status(200).json(user)
    }

    return res.status(401).json({ message: 'Invalid credentials' })
  })
}

// Plain Pw User Registering => Highly Unsafe
export const registerUserPlain = (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' })
  }

  checkIfUsernameExists(username, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error checking user' })
    if (results.length > 0) return res.status(400).json({ message: 'Username exists' })

    createUser(username, password, (err) => {
      if (err) return res.status(500).json({ message: 'Register error' })
      return res.status(200).json({ message: 'Registered successfully (plain)' })
    })
  })
}

// Hashed Pw User Registering => Safer
export const registerUserHashed = (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' })
  }

  checkIfUsernameExists(username, async (err, results) => {
    if (err) return res.status(500).json({ message: 'Error checking user' })
    if (results.length > 0) return res.status(400).json({ message: 'Username exists' })

    // Password Hashing
    const salt = await genSalt(10)
    const hashedPassword = await hash(password, salt)

    const query = 'INSERT INTO users (username, password) VALUES (?, ?)'
    db.query(query, [username, hashedPassword], (err) => {
      if (err) return res.status(500).json({ message: 'Register error' })
      return res.status(200).json({ message: 'Registered successfully (hashed)' })
    })
  })
}
