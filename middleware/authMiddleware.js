const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'NOt Tken' });
    }

    const decodedToken = jwt.verify(token, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDIzNTIyZWQzMjEwMDVmM2M4MDdmNzUiLCJpYXQiOjE2ODAwMzY0MTd9.nUayvOMmxgS4Om7lG3Zsh344STq5GA0TZcviUTH02kE");

    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
