import Exercise from '../models/Exercise.js';

// Get all exercises
export const getAllExercises = async (req, res) => {
  try {
    const exercises = await Exercise.getAll();
    res.json({
      success: true,
      data: exercises
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching exercises',
      error: error.message
    });
  }
};

// Get exercises by workout ID
export const getExercisesByWorkout = async (req, res) => {
  try {
    const exercises = await Exercise.getByWorkoutId(req.params.workoutId);
    res.json({
      success: true,
      data: exercises
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching exercises for workout',
      error: error.message
    });
  }
};

// Get exercise by ID
export const getExerciseById = async (req, res) => {
  try {
    const exercise = await Exercise.getById(req.params.id);

    if (!exercise) {
      return res.status(404).json({
        success: false,
        message: 'Exercise not found'
      });
    }

    res.json({
      success: true,
      data: exercise
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching exercise',
      error: error.message
    });
  }
};

// Create new exercise
export const createExercise = async (req, res) => {
  try {
    const { workout_id, name, muscle_group, sets, reps, weight } = req.body;

    const newExercise = await Exercise.create({
      workout_id,
      name,
      muscle_group,
      sets,
      reps,
      weight
    });

    res.status(201).json({
      success: true,
      message: 'Exercise created successfully',
      data: newExercise
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating exercise',
      error: error.message
    });
  }
};

// Update exercise
export const updateExercise = async (req, res) => {
  try {
    const { workout_id, name, muscle_group, sets, reps, weight } = req.body;

    const updated = await Exercise.update(req.params.id, {
      workout_id,
      name,
      muscle_group,
      sets,
      reps,
      weight
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Exercise not found'
      });
    }

    res.json({
      success: true,
      message: 'Exercise updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating exercise',
      error: error.message
    });
  }
};

// Delete exercise
export const deleteExercise = async (req, res) => {
  try {
    const deleted = await Exercise.delete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Exercise not found'
      });
    }

    res.json({
      success: true,
      message: 'Exercise deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting exercise',
      error: error.message
    });
  }
};
