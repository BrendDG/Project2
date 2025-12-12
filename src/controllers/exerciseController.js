import Exercise from '../models/Exercise.js';

// Get all exercises (with optional pagination via query params)
export const getAllExercises = async (req, res) => {
  try {
    const { limit, offset } = req.query;

    // If limit and offset are provided, use pagination
    if (limit && offset !== undefined) {
      const result = await Exercise.getAllPaginated(limit, offset);
      return res.json({
        success: true,
        ...result
      });
    }

    // Otherwise, return all exercises
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

// Search exercises
export const searchExercises = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Search term (name) is required'
      });
    }

    const exercises = await Exercise.search(name);
    res.json({
      success: true,
      data: exercises,
      count: exercises.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching exercises',
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
    const { workout_id, name, muscle_group, sets, reps, weight, notes } = req.body;

    // Validatie
    if (!workout_id || !name || !muscle_group || !sets || !reps) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: workout_id, name, muscle_group, sets, reps'
      });
    }

    const newExercise = await Exercise.create({
      workout_id,
      name,
      muscle_group,
      sets,
      reps,
      weight,
      notes
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
    const { workout_id, name, muscle_group, sets, reps, weight, notes } = req.body;

    // Validation
    if (!workout_id || !name || !muscle_group || !sets || !reps) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: workout_id, name, muscle_group, sets, reps'
      });
    }

    const updated = await Exercise.update(req.params.id, {
      workout_id,
      name,
      muscle_group,
      sets,
      reps,
      weight,
      notes
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
