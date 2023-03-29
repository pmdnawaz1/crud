const express = require('express');
const { body } = require('express-validator');
const channelController = require('../controllers/channelController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', channelController.getChannels);

router.post('/', authMiddleware, [
  body('name').trim().notEmpty().withMessage('Name is required.'),
], channelController.createChannel);

router.delete('/:channelId', authMiddleware, channelController.deleteChannel);

router.get('/:channelId/posts', channelController.getChannelsWithPosts);

router.post('/:channelId/posts', authMiddleware, [
  body('content').trim().notEmpty().withMessage('Content is required.'),
], channelController.createPost);

module.exports = router;
