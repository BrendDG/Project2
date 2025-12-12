import Workout from '../models/Workout.js';

// Get all workouts (with optional pagination via query params)
export const getAllWorkouts = async (req, res) => {
  try {
    const { limit, offset } = req.query;

    // If limit and offset are provided, use pagination
    if (limit && offset !== undefined) {
      const result = await Workout.getAllPaginated(limit, offset);
      return res.json({
        success: true,
        ...result
      });
    }

    // Otherwise, return all workouts
    const workouts = await Workout.getAll();
    res.json({
      success: true,
      data: workouts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching workouts',
      error: error.message
    });
  }
};

// Search workouts
export const searchWorkouts = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Search term (name) is required'
      });
    }

    const workouts = await Workout.search(name);
    res.json({
      success: true,
      data: workouts,
      count: workouts.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching workouts',
      error: error.message
    });
  }
};

// Get workout by ID
export const getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.getById(req.params.id);

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found'
      });
    }

    res.json({
      success: true,
      data: workout
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching workout',
      error: error.message
    });
  }
};

// Create new workout
export const createWorkout = async (req, res) => {
  try {
    const { name, date, duration, type, notes } = req.body;

    const newWorkout = await Workout.create({ name, date, duration, type, notes });

    res.status(201).json({
      success: true,
      message: 'Workout created successfully',
      data: newWorkout
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating workout',
      error: error.message
    });
  }
};

// Update workout
export const updateWorkout = async (req, res) => {
  try {
    const { name, date, duration, type, notes } = req.body;

    const updated = await Workout.update(req.params.id, { name, date, duration, type, notes });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found'
      });
    }

    res.json({
      success: true,
      message: 'Workout updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating workout',
      error: error.message
    });
  }
};

// Delete workout
export const deleteWorkout = async (req, res) => {
  try {
    const deleted = await Workout.delete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found'
      });
    }

    res.json({
      success: true,
      message: 'Workout deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting workout',
      error: error.message
    });
  }
};
