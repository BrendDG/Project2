import express from 'express';
import {
  getAllWorkouts,
  searchWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout
} from '../controllers/workoutController.js';
import { validateWorkout, validateId } from '../middleware/validation.js';

const router = express.Router();

// GET all workouts (supports pagination via ?limit=10&offset=0)
router.get('/', getAllWorkouts);

// GET search workouts (must be before /:id route)
router.get('/search', searchWorkouts);

// GET workout by ID
router.get('/:id', validateId, getWorkoutById);

// POST new workout
router.post('/', validateWorkout, createWorkout);

// PUT update workout
router.put('/:id', validateId, validateWorkout, updateWorkout);

// DELETE workout
router.delete('/:id', validateId, deleteWorkout);

export default router;
