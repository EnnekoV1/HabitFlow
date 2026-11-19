const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require('../db')

const router = express.Router()

router.post('/register', async (req, res) => {
  const { email, username, password } = req.body

  if (!email || !username || !password) {
    return res.status(400).json({ error: 'Email, username and password are required' })
  }

  try {
    const password_hash = await bcrypt.hash(password, 10)

    const result = await pool.query(
      'INSERT INTO users (email, username, password_hash) VALUES ($1, $2, $3) RETURNING id, email, username',
      [email, username, password_hash]
    )

    res.status(201).json(result.rows[0])
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Email or username already in use' })
    }
    console.error(err)
    res.status(500).json({ error: 'Registration failed' })
  }
})

module.exports = router