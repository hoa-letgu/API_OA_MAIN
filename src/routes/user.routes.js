const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const auth = require('../middleware/auth');
const { body } = require('express-validator');

// Validation middleware
const validateRegistration = [
    body('username').trim().isLength({ min: 3 }),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 })
];

// Routes
router.post('/register', validateRegistration, UserController.register);
router.post('/login', UserController.login);
router.get('/profile', auth, UserController.getProfile);

module.exports = router;