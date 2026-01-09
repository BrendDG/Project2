import db from '../config/database.js';

class Workout {
  // Haal alle workouts op
  static async getAll() {
    try {
      const [rows] = await db.query('SELECT * FROM workouts ORDER BY date DESC');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Haal alle workouts op met paginatie
  static async getAllPaginated(limit = 10, offset = 0) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM workouts ORDER BY date DESC LIMIT ? OFFSET ?',
        [parseInt(limit), parseInt(offset)]
      );

      // Haal totaal aantal op voor paginatie informatie
      const [countResult] = await db.query('SELECT COUNT(*) as total FROM workouts');
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

  // Zoek workouts op naam of type
  static async search(searchTerm) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM workouts WHERE name LIKE ? OR type LIKE ? ORDER BY date DESC',
        [`%${searchTerm}%`, `%${searchTerm}%`]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Haal workout op via ID
  static async getById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM workouts WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Maak nieuwe workout aan
  static async create(data) {
    try {
      const { name, date, duration, type, notes } = data;
      const [result] = await db.query(
        'INSERT INTO workouts (name, date, duration, type, notes) VALUES (?, ?, ?, ?, ?)',
        [name, date, duration, type, notes || null]
      );
      return { id: result.insertId, ...data };
    } catch (error) {
      throw error;
    }
  }

  // Update workout
  static async update(id, data) {
    try {
      const { name, date, duration, type, notes } = data;
      const [result] = await db.query(
        'UPDATE workouts SET name = ?, date = ?, duration = ?, type = ?, notes = ? WHERE id = ?',
        [name, date, duration, type, notes || null, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Verwijder workout
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
