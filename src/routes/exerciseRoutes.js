import express from 'express';
import {
  getAllExercises,
  searchExercises,
  getExercisesByWorkout,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise
} from '../controllers/exerciseController.js';

const router = express.Router();

// Haal alle exercises op (ondersteunt paginatie via ?limit=10&offset=0)
router.get('/', getAllExercises);

// Zoek exercises (moet voor /:id route komen)
router.get('/search', searchExercises);

// Haal exercises op via workout ID
router.get('/workout/:workoutId', getExercisesByWorkout);

// Haal exercise op via ID
router.get('/:id', getExerciseById);

// Maak nieuwe exercise aan
router.post('/', createExercise);

// Update exercise
router.put('/:id', updateExercise);

// Verwijder exercise
router.delete('/:id', deleteExercise);

export default router;
