import express from 'express';
import {
  getAllExercises,
  getExercisesByWorkout,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise
} from '../controllers/exerciseController.js';

const router = express.Router();

// GET all exercises
router.get('/', getAllExercises);

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
