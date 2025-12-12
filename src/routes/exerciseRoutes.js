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

// GET all exercises (supports pagination via ?limit=10&offset=0)
router.get('/', getAllExercises);

// GET search exercises (must be before /:id route)
router.get('/search', searchExercises);

// GET exercises by workout ID
router.get('/workout/:workoutId', getExercisesByWorkout);

// GET exercise by ID
router.get('/:id', getExerciseById);

// POST new exercise
router.post('/', createExercise);

// PUT update exercise
router.put('/:id', updateExercise);

// DELETE exercise
router.delete('/:id', deleteExercise);

export default router;
