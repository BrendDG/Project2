import db from '../config/database.js';

class Exercise {
  // Get all exercises
  static async getAll() {
    try {
      const [rows] = await db.query(
        `SELECT e.*, w.name as workout_name, w.date as workout_date
         FROM exercises e
         LEFT JOIN workouts w ON e.workout_id = w.id
         ORDER BY e.created_at DESC`
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get all exercises with pagination
  static async getAllPaginated(limit = 10, offset = 0) {
    try {
      const [rows] = await db.query(
        `SELECT e.*, w.name as workout_name, w.date as workout_date
         FROM exercises e
         LEFT JOIN workouts w ON e.workout_id = w.id
         ORDER BY e.created_at DESC
         LIMIT ? OFFSET ?`,
        [parseInt(limit), parseInt(offset)]
      );

      // Get total count for pagination info
      const [countResult] = await db.query('SELECT COUNT(*) as total FROM exercises');
      const total = countResult[0].total;

      return {
        data: rows,
        pagination: {
          total,
          limit: parseInt(limit),
          offset: parseInt(offset),
          totalPages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw error;
    }
  }

  // Search exercises by name or muscle group
  static async search(searchTerm) {
    try {
      const [rows] = await db.query(
        `SELECT e.*, w.name as workout_name, w.date as workout_date
         FROM exercises e
         LEFT JOIN workouts w ON e.workout_id = w.id
         WHERE e.name LIKE ? OR e.muscle_group LIKE ?
         ORDER BY e.created_at DESC`,
        [`%${searchTerm}%`, `%${searchTerm}%`]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get exercises by workout ID
  static async getByWorkoutId(workoutId) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM exercises WHERE workout_id = ? ORDER BY created_at DESC',
        [workoutId]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get exercise by ID
  static async getById(id) {
    try {
      const [rows] = await db.query(
        `SELECT e.*, w.name as workout_name, w.date as workout_date
         FROM exercises e
         LEFT JOIN workouts w ON e.workout_id = w.id
         WHERE e.id = ?`,
        [id]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Create new exercise
  static async create(data) {
    try {
      const { workout_id, name, muscle_group, sets, reps, weight } = data;
      const [result] = await db.query(
        'INSERT INTO exercises (workout_id, name, muscle_group, sets, reps, weight) VALUES (?, ?, ?, ?, ?, ?)',
        [workout_id, name, muscle_group, sets, reps, weight || null]
      );
      return { id: result.insertId, ...data };
    } catch (error) {
      throw error;
    }
  }

  // Update exercise
  static async update(id, data) {
    try {
      const { workout_id, name, muscle_group, sets, reps, weight } = data;
      const [result] = await db.query(
        'UPDATE exercises SET workout_id = ?, name = ?, muscle_group = ?, sets = ?, reps = ?, weight = ? WHERE id = ?',
        [workout_id, name, muscle_group, sets, reps, weight || null, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Delete exercise
  static async delete(id) {
    try {
      const [result] = await db.query('DELETE FROM exercises WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

export default Exercise;
