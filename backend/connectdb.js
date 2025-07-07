import mysql from 'mysql2'

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sarraadb',
  // VULNERABLE - ENABLES MULTIPLES STATEMENTS
  multipleStatements: true,
})

db.connect((err) => {
  if (err) {
    console.error('DB connection failed: ' + err.stack)
    return
  }
  console.log('Connected to database.')
})
