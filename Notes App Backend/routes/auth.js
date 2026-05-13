const express = require('express');
const { register, login, getCurrentUser } = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Public Routes
router.post('/register', register);
router.post('/login', login);

// Protected Routes
router.get('/me', verifyToken, getCurrentUser);

module.exports = router;
