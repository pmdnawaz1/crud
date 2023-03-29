const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/signup', [
  body('email').isEmail().withMessage('Please enter a valid email.'),
  body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
], authController.signup);

router.post('/login', [
  body('email').isEmail().withMessage('Please enter a valid email.'),
  body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
], authController.login);

module.exports = router;
