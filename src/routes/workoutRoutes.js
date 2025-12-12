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

// Haal alle workouts op (ondersteunt paginatie via ?limit=10&offset=0)
router.get('/', getAllWorkouts);

// Zoek workouts (moet voor /:id route komen)
router.get('/search', searchWorkouts);

// Haal workout op via ID
router.get('/:id', validateId, getWorkoutById);

// Maak nieuwe workout aan
router.post('/', validateWorkout, createWorkout);

// Update workout
router.put('/:id', validateId, validateWorkout, updateWorkout);

// Verwijder workout
router.delete('/:id', validateId, deleteWorkout);

export default router;
