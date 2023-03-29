const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const channelRoutes = require('./routes/channelRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const postRoutes = require('./routes/postRoutes');

// Connect to database
mongoose.connect('mongodb+srv://pmdnawaz1:Yarasool12@cluster0.vbrmysz.mongodb.net/login?retryWrites=true&w=majority'
);

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use('/auth', authRoutes);
app.use('/channels', channelRoutes);
app.use('/', dashboardRoutes);
app.use('/posts', postRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
