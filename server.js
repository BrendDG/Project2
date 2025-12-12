/**
 * Workout Tracker API - Main Server File
 *
 * A RESTful API for managing workouts and exercises
 * Built with Node.js, Express, and MySQL
 */

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { testConnection } from './src/config/database.js';
import workoutRoutes from './src/routes/workoutRoutes.js';
import exerciseRoutes from './src/routes/exerciseRoutes.js';


// CONFIGURATION


// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;


// MIDDLEWARE


// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML documentation)
app.use(express.static('public'));


// DATABASE CONNECTION


// Test database connection on startup
testConnection();


// API ROUTES


// Workout routes
app.use('/api/workouts', workoutRoutes);

// Exercise routes
app.use('/api/exercises', exerciseRoutes);


// ERROR HANDLING


// 404 handler - Route not found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});


// START SERVER


const server = app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('  Workout Tracker API');
  console.log('='.repeat(50));
  console.log(`  Server running on port ${PORT}`);
  console.log(`  Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('');
  console.log('  Available endpoints:');
  console.log(`  - Documentation: http://localhost:${PORT}`);
  console.log(`  - Workouts API:  http://localhost:${PORT}/api/workouts`);
  console.log(`  - Exercises API: http://localhost:${PORT}/api/exercises`);
  console.log('='.repeat(50));
});


// GRACEFUL SHUTDOWN


// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\nSIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});
