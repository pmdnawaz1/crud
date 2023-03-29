const Channel = require('../models/Channel');
const Post = require('../models/Post');

exports.getChannels = async (req, res, next) => {
  try {
    const channels = await Channel.find().populate('creator', 'email');
    res.status(200).json({ success: true, channels });
  } catch (error) {
    next(error);
  }
};

exports.createChannel = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const channel = new Channel({ name, description, creator: req.user._id });
    await channel.save();
    res.status(201).json({ success: true, channel });
  } catch (error) {
    next(error);
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const { channelId } = req.params;
    const posts = await Post.find({ channel: channelId }).populate('author', 'email');
    res.status(200).json({ success: true, posts });
  } catch (error) {
    next(error);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const { content } = req.body;
    const { channelId } = req.params;
    const post = new Post({ content, author: req.user._id, channel: channelId });
    await post.save();
    const channel = await Channel.findByIdAndUpdate(
      channelId,
      { $push: { posts: post._id } },
      { new: true }
    );
    res.status(201).json({ success: true, post, channel });
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByIdAndDelete(postId);
    const channel = await Channel.findByIdAndUpdate(
      post.channel,
      { $pull: { posts: post._id } },
      { new: true }
    );
    res.status(200).json({ success: true, post, channel });
  } catch (error) {
    next(error);
  }
};

exports.getChannelsWithPosts = async (req, res, next) => {
  try {
    const channels = await Channel.find().populate('creator', 'email').populate('posts', 'content author');
    res.status(200).json({ success: true, channels });
  } catch (error) {
    next(error);
  }
};

exports.deleteChannel = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const deletedChannel = await Channel.findByIdAndDelete(id);
      if (!deletedChannel) {
        return res.status(404).json({ message: 'Channel not found' });
      }
  
      res.status(200).json({ message: 'Channel deleted successfully' });
    } catch (err) {
      next(err);
    }
  };