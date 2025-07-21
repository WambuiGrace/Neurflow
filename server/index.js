const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Set static folder for uploads
app.use('/uploads', express.static('uploads'));

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects');
const teamRoutes = require('./routes/teams');
const notificationRoutes = require('./routes/notifications');
const analyticsRoutes = require('./routes/analytics');
const calendarRoutes = require('./routes/calendar');
const fileRoutes = require('./routes/files');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/events', calendarRoutes);
app.use('/api/files', fileRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to NeuroFlow API' });
});

// Import utilities
const connectDB = require('./config/db');
const createUploadsDir = require('./utils/createUploadsDir');

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

// Create uploads directory
createUploadsDir();

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

// Import error handler middleware
const errorHandler = require('./middleware/error');

// Error handling middleware
app.use(errorHandler);