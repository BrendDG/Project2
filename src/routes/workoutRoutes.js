import express from 'express';
import {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout
} from '../controllers/workoutController.js';
import { validateWorkout, validateId } from '../middleware/validation.js';

const router = express.Router();

// GET all workouts
router.get('/', getAllWorkouts);

// GET workout by ID
router.get('/:id', validateId, getWorkoutById);

// POST new workout
router.post('/', validateWorkout, createWorkout);

// PUT update workout
router.put('/:id', validateId, validateWorkout, updateWorkout);

// DELETE workout
router.delete('/:id', validateId, deleteWorkout);

export default router;
