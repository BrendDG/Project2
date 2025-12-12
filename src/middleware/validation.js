// Validatie helper functies
const isEmpty = (value) => {
  return value === undefined || value === null || value === '';
};

const isString = (value) => {
  return typeof value === 'string';
};

const isNumber = (value) => {
  return typeof value === 'number' && !isNaN(value);
};

const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isPositiveNumber = (value) => {
  return isNumber(value) && value > 0;
};

// Workout validatie regels
export const validateWorkout = (req, res, next) => {
  const errors = [];
  const { name, date, duration, type } = req.body;

  // Controleer op lege velden
  if (isEmpty(name)) {
    errors.push('Name is required');
  } else if (!isString(name)) {
    errors.push('Name must be a string');
  } else if (name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (isEmpty(date)) {
    errors.push('Date is required');
  } else if (!isValidDate(date)) {
    errors.push('Date must be a valid date format (YYYY-MM-DD)');
  }

  if (isEmpty(duration)) {
    errors.push('Duration is required');
  } else if (!isNumber(duration)) {
    errors.push('Duration must be a number');
  } else if (!isPositiveNumber(duration)) {
    errors.push('Duration must be a positive number');
  }

  if (isEmpty(type)) {
    errors.push('Type is required');
  } else if (!isString(type)) {
    errors.push('Type must be a string');
  } else {
    const validTypes = ['cardio', 'strength', 'flexibility', 'sports', 'mixed'];
    if (!validTypes.includes(type.toLowerCase())) {
      errors.push(`Type must be one of: ${validTypes.join(', ')}`);
    }
  }

  // Als er validatie fouten zijn, stuur ze terug
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  // Validatie geslaagd, ga door naar volgende middleware
  next();
};

// Exercise validatie regels
export const validateExercise = (req, res, next) => {
  const errors = [];
  const { workout_id, name, muscle_group, sets, reps, weight } = req.body;

  // Controleer op lege velden
  if (isEmpty(workout_id)) {
    errors.push('Workout ID is required');
  } else if (!isNumber(workout_id)) {
    errors.push('Workout ID must be a number');
  } else if (!isPositiveNumber(workout_id)) {
    errors.push('Workout ID must be a positive number');
  }

  if (isEmpty(name)) {
    errors.push('Name is required');
  } else if (!isString(name)) {
    errors.push('Name must be a string');
  } else if (name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (isEmpty(muscle_group)) {
    errors.push('Muscle group is required');
  } else if (!isString(muscle_group)) {
    errors.push('Muscle group must be a string');
  } else {
    const validMuscleGroups = ['chest', 'back', 'legs', 'shoulders', 'arms', 'core', 'full_body'];
    if (!validMuscleGroups.includes(muscle_group.toLowerCase())) {
      errors.push(`Muscle group must be one of: ${validMuscleGroups.join(', ')}`);
    }
  }

  if (isEmpty(sets)) {
    errors.push('Sets is required');
  } else if (!isNumber(sets)) {
    errors.push('Sets must be a number');
  } else if (!isPositiveNumber(sets)) {
    errors.push('Sets must be a positive number');
  }

  if (isEmpty(reps)) {
    errors.push('Reps is required');
  } else if (!isNumber(reps)) {
    errors.push('Reps must be a number');
  } else if (!isPositiveNumber(reps)) {
    errors.push('Reps must be a positive number');
  }

  // Weight is optioneel, maar als opgegeven, valideer het
  if (!isEmpty(weight)) {
    if (!isNumber(weight)) {
      errors.push('Weight must be a number');
    } else if (weight < 0) {
      errors.push('Weight cannot be negative');
    }
  }

  // Als er validatie fouten zijn, stuur ze terug
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  // Validatie geslaagd, ga door naar volgende middleware
  next();
};

// Algemene validatie voor ID parameters
export const validateId = (req, res, next) => {
  const id = parseInt(req.params.id);

  if (isNaN(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID parameter',
      errors: ['ID must be a positive number']
    });
  }

  // Validatie geslaagd, ga door naar volgende middleware
  next();
};

// Email validatie (voor toekomstige gebruikersfunctionaliteit)
export const validateEmail = (email) => {
  if (isEmpty(email)) {
    return { valid: false, message: 'Email is required' };
  }

  if (!isString(email)) {
    return { valid: false, message: 'Email must be a string' };
  }

  if (!isValidEmail(email)) {
    return { valid: false, message: 'Email format is invalid' };
  }

  return { valid: true };
};

export default {
  validateWorkout,
  validateExercise,
  validateId,
  validateEmail
};
