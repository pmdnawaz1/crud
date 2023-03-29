const express = require('express');
const { body } = require('express-validator');
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.delete('/:postId', authMiddleware, postController.deletePost);

router.patch('/:postId', authMiddleware, [
  body('content').trim().notEmpty().withMessage('Content is required.'),
], postController.updatePost);

module.exports = router;
