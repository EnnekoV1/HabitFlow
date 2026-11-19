const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const pool = require('./db')
const authRoutes = require('./routes/auth')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)

app.get('/api/health', async (req, res) => {
  const result = await pool.query('SELECT NOW()')
  res.json({
    status: 'server is running',
    time: result.rows[0].now
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})