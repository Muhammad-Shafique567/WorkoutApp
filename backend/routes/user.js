const express = require('express')

const { signupUser, loginUser } = require('../controllers/userController')

const router = express.Router()

router.post('/signup', signupUser) // signup route

router.post('/login', loginUser) // login route

module.exports = router