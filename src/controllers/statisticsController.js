import Statistics from '../models/Statistics.js';

// Haal alle statistieken op
export const getAllStatistics = async (req, res) => {
  try {
    const stats = await Statistics.getAllStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
};

// Haal alleen workout statistieken op
export const getWorkoutStatistics = async (req, res) => {
  try {
    const stats = await Statistics.getWorkoutStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching workout statistics',
      error: error.message
    });
  }
};

// Haal alleen exercise statistieken op
export const getExerciseStatistics = async (req, res) => {
  try {
    const stats = await Statistics.getExerciseStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching exercise statistics',
      error: error.message
    });
  }
};
