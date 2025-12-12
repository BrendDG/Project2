import db from '../config/database.js';

class Workout {
  // Get all workouts
  static async getAll() {
    try {
      const [rows] = await db.query('SELECT * FROM workouts ORDER BY date DESC');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Get workout by ID
  static async getById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM workouts WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Create new workout
  static async create(data) {
    try {
      const { name, date, duration, type } = data;
      const [result] = await db.query(
        'INSERT INTO workouts (name, date, duration, type) VALUES (?, ?, ?, ?)',
        [name, date, duration, type]
      );
      return { id: result.insertId, ...data };
    } catch (error) {
      throw error;
    }
  }

  // Update workout
  static async update(id, data) {
    try {
      const { name, date, duration, type } = data;
      const [result] = await db.query(
        'UPDATE workouts SET name = ?, date = ?, duration = ?, type = ? WHERE id = ?',
        [name, date, duration, type, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Delete workout
  static async delete(id) {
    try {
      const [result] = await db.query('DELETE FROM workouts WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

export default Workout;
