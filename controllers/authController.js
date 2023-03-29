const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const JWT_SECRET = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDIzNTIyZWQzMjEwMDVmM2M4MDdmNzUiLCJpYXQiOjE2ODAwMzY0MTd9.nUayvOMmxgS4Om7lG3Zsh344STq5GA0TZcviUTH02kE';

exports.signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });
    res.status(201).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(422).json({ error: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(422).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ success: true });
};
