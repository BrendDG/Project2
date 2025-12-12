import express from 'express';
import {
  getAllExercises,
  getExercisesByWorkout,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise
} from '../controllers/exerciseController.js';
import { validateExercise, validateId } from '../middleware/validation.js';

const router = express.Router();

// GET all exercises
router.get('/', getAllExercises);

// GET exercises by workout ID
router.get('/workout/:workoutId', validateId, getExercisesByWorkout);

// GET exercise by ID
router.get('/:id', validateId, getExerciseById);

// POST new exercise
router.post('/', validateExercise, createExercise);

// PUT update exercise
router.put('/:id', validateId, validateExercise, updateExercise);

// DELETE exercise
router.delete('/:id', validateId, deleteExercise);

export default router;
