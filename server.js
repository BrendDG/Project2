import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { testConnection } from './src/config/database.js';
import workoutRoutes from './src/routes/workoutRoutes.js';
import exerciseRoutes from './src/routes/exerciseRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test database connection on startup
testConnection();

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Workout Tracker API',
    version: '1.0.0',
    endpoints: {
      workouts: '/api/workouts',
      exercises: '/api/exercises'
    }
  });
});

// API Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/exercises', exerciseRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Workouts: http://localhost:${PORT}/api/workouts`);
  console.log(`API Exercises: http://localhost:${PORT}/api/exercises`);
});
