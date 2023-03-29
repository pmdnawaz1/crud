
const Post = require('../models/Post');

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate('author', 'email').populate('channel', 'name');
    res.status(200).json({ success: true, posts });
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByIdAndDelete(postId);
    res.status(200).json({ success: true, post });
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
    const { id } = req.params;
    const { title, content } = req.body;
  
    try {
      // Find the post with the specified id and update its properties
      const updatedPost = await Post.findByIdAndUpdate(id, { title, content }, { new: true });
      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
    } catch (err) {
      next(err);
    }
  };