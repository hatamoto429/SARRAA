import express, { json } from 'express'
import { createConnection } from 'mysql2'
import { compare, genSalt, hash } from 'bcryptjs'
import cors from 'cors'

const app = express()
const port = 5002

app.use(cors())
app.use(json())

const db = createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sarraadb',
})

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack)
    return
  }
  console.log('Connected to the database.')
})

// TODO: Make vulnerable to SQLi and XSS, rely on ML model

// Login Endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body

  // Secure (parameterized query)
  //const query = 'SELECT * FROM users WHERE username = ?'

  // Vulnerable Concatenating input directly into the query
  const query = `SELECT * FROM users WHERE username = '${username}'`

  //Check valid credentials
  db.query(query, [username], async (err, results) => {
    if (err) {
      console.error('Database query error:', err)
      return res.status(500).json({ message: 'Database query error' })
    }

    if (results.length > 0) {
      const user = results[0]
      const match = await compare(password, user.password)
      if (match) {
        return res.status(200).json({ message: 'Login successful' })
      } else {
        return res.status(401).json({ message: 'Invalid credentials' })
      }
    } else {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
  })
})

// Register Endpoint
app.post('/register', async (req, res) => {
  const { username, password } = req.body

  // Check if the username already exists
  const checkQuery = 'SELECT * FROM users WHERE username = ?'
  db.query(checkQuery, [username], async (err, results) => {
    if (err) {
      console.error('Error checking username:', err)
      return res.status(500).json({ message: 'Error checking username availability' })
    }
    if (results.length > 0) {
      return res.status(400).json({ message: 'Username already exists' })
    }

    // Proceed with registration
    const salt = await genSalt(10)
    const hashedPassword = await hash(password, salt)

    const query = `INSERT INTO users (username, password) VALUES (?, ?)`

    db.query(query, [username, hashedPassword], (err, results) => {
      if (err) {
        console.error('Error during registration:', err)
        return res.status(500).json({ message: 'Error during registration' })
      }
      return res.status(200).json({ message: 'Registration successful' })
    })
  })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
