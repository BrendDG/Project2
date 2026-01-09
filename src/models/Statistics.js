import db from '../config/database.js';

class Statistics {
  // Haal alle workout statistieken op
  static async getWorkoutStats() {
    try {
      // Totaal aantal workouts
      const [totalWorkouts] = await db.query(
        'SELECT COUNT(*) as total FROM workouts'
      );

      // Totale trainingstijd
      const [totalDuration] = await db.query(
        'SELECT SUM(duration) as total_minutes FROM workouts'
      );

      // Gemiddelde workout duur
      const [avgDuration] = await db.query(
        'SELECT AVG(duration) as avg_minutes FROM workouts'
      );

      // Workouts per type
      const [workoutsByType] = await db.query(
        `SELECT type, COUNT(*) as count, SUM(duration) as total_duration
         FROM workouts
         GROUP BY type
         ORDER BY count DESC`
      );

      // Meest recente workouts
      const [recentWorkouts] = await db.query(
        'SELECT * FROM workouts ORDER BY date DESC LIMIT 5'
      );

      return {
        total_workouts: totalWorkouts[0].total,
        total_duration_minutes: totalDuration[0].total_minutes || 0,
        avg_duration_minutes: Math.round(avgDuration[0].avg_minutes || 0),
        workouts_by_type: workoutsByType,
        recent_workouts: recentWorkouts
      };
    } catch (error) {
      throw error;
    }
  }

  // Haal alle exercise statistieken op
  static async getExerciseStats() {
    try {
      // Totaal aantal exercises
      const [totalExercises] = await db.query(
        'SELECT COUNT(*) as total FROM exercises'
      );

      // Exercises per spiergroep
      const [exercisesByMuscle] = await db.query(
        `SELECT muscle_group, COUNT(*) as count
         FROM exercises
         GROUP BY muscle_group
         ORDER BY count DESC`
      );

      // Gemiddelde sets en reps
      const [avgSetsReps] = await db.query(
        `SELECT AVG(sets) as avg_sets, AVG(reps) as avg_reps
         FROM exercises`
      );

      // Top 5 meest gebruikte exercises
      const [topExercises] = await db.query(
        `SELECT name, muscle_group, COUNT(*) as usage_count
         FROM exercises
         GROUP BY name, muscle_group
         ORDER BY usage_count DESC
         LIMIT 5`
      );

      // Totaal gewicht volume (sets * reps * weight)
      const [volumeStats] = await db.query(
        `SELECT SUM(sets * reps * COALESCE(weight, 0)) as total_volume,
                AVG(weight) as avg_weight
         FROM exercises
         WHERE weight IS NOT NULL`
      );

      return {
        total_exercises: totalExercises[0].total,
        exercises_by_muscle_group: exercisesByMuscle,
        avg_sets: Math.round(avgSetsReps[0].avg_sets || 0),
        avg_reps: Math.round(avgSetsReps[0].avg_reps || 0),
        top_exercises: topExercises,
        total_volume_kg: Math.round(volumeStats[0].total_volume || 0),
        avg_weight_kg: Math.round(volumeStats[0].avg_weight || 0)
      };
    } catch (error) {
      throw error;
    }
  }

  // Haal alle statistieken op (combined)
  static async getAllStats() {
    try {
      const workoutStats = await this.getWorkoutStats();
      const exerciseStats = await this.getExerciseStats();

      return {
        workout_statistics: workoutStats,
        exercise_statistics: exerciseStats
      };
    } catch (error) {
      throw error;
    }
  }
}

export default Statistics;
