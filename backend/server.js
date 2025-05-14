import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'

const app = express()
const port = 5002

app.use(cors())
app.use(express.json())

app.use('/api', authRoutes)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
