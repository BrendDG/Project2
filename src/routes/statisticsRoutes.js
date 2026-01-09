import express from 'express';
import {
  getAllStatistics,
  getWorkoutStatistics,
  getExerciseStatistics
} from '../controllers/statisticsController.js';

const router = express.Router();

// Haal alle statistieken op (workout + exercise)
router.get('/', getAllStatistics);

// Haal alleen workout statistieken op
router.get('/workouts', getWorkoutStatistics);

// Haal alleen exercise statistieken op
router.get('/exercises', getExerciseStatistics);

export default router;
