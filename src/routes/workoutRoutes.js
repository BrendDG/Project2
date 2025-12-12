import express from 'express';
import {
  getAllWorkouts,
  searchWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout
} from '../controllers/workoutController.js';

const router = express.Router();

// GET all workouts (supports pagination via ?limit=10&offset=0)
router.get('/', getAllWorkouts);

// GET search workouts (must be before /:id route)
router.get('/search', searchWorkouts);

// GET workout by ID
router.get('/:id', getWorkoutById);

// POST new workout
router.post('/', createWorkout);

// PUT update workout
router.put('/:id', updateWorkout);

// DELETE workout
router.delete('/:id', deleteWorkout);

export default router;
