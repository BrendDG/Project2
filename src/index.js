import express from 'express';
import dotenv from 'dotenv';
import { testConnection } from './config/database.js';
import workoutRoutes from './routes/workoutRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
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
      workouts: '/api/workouts'
    }
  });
});

// API Routes
app.use('/api/workouts', workoutRoutes);

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
  console.log(`API available at http://localhost:${PORT}/api/workouts`);
});
