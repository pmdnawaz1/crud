const User = require('../models/User');
const Channel = require('../models/Channel');
const Post = require('../models/Post');

exports.getDashboardData = async (req, res, next) => {
  try {
    const userCount = await User.countDocuments();
    const channelCount = await Channel.countDocuments();
    const postCount = await Post.countDocuments();
    const posts = await Post.find().populate('author', 'email').populate('channel', 'name').sort('-createdAt').limit(10);
    res.status(200).json({ success: true, userCount, channelCount, postCount, posts });
  } catch (error) {
    next(error);
  }
};
