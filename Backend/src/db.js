const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'habittracker',
  user: 'postgres',
  password: 'Dentyi421.',
})

pool.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err)
  } else {
    console.log('Connected to PostgreSQL successfully')
  }
})

module.exports = pool