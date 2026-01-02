const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require('./config/database');
const authRoutes = require("./routes/authRoutes");
const listingRoutes = require("./routes/listingRoutes");
const requestRoutes = require("./routes/requestRoutes");
const testRoutes = require("./routes/testRoutes");

// Load environment variables
dotenv.config();

// Set default environment variables
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || 3003;
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/skill-swap';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'default-jwt-secret-key';
process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
process.env.CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', process.env.CORS_ORIGIN],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/test", testRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Connect to MongoDB
connectDB();

// Function to start server with port retry
const startServer = (port) => {
  try {
    app.listen(port, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
      console.log('Environment configuration:', {
        NODE_ENV: process.env.NODE_ENV,
        MONGODB_URI: process.env.MONGODB_URI,
        JWT_SECRET: 'Set',
        CORS_ORIGIN: process.env.CORS_ORIGIN
      });
    });
  } catch (error) {
    if (error.code === 'EADDRINUSE') {
      console.log(`Port ${port} is busy, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Error starting server:', error);
      process.exit(1);
    }
  }
};

// Start server with initial port
startServer(process.env.PORT);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // Close server & exit process
  process.exit(1);
});
