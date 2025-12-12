/**
 * Workout Tracker API - Hoofd Server Bestand
 *
 * Een RESTful API voor het beheren van workouts en oefeningen
 * Gebouwd met Node.js, Express en MySQL
 */

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { testConnection } from './src/config/database.js';
import workoutRoutes from './src/routes/workoutRoutes.js';
import exerciseRoutes from './src/routes/exerciseRoutes.js';

// CONFIGURATIE

// Laad environment variabelen
dotenv.config();

// Initialiseer Express applicatie
const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARE

// Activeer CORS
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Serveer statische bestanden (HTML documentatie)
app.use(express.static('public'));

// DATABASE CONNECTIE

// Test database connectie bij opstarten
testConnection();

// API ROUTES

// Workout routes
app.use('/api/workouts', workoutRoutes);

// Exercise routes
app.use('/api/exercises', exerciseRoutes);

// ERROR HANDLING

// 404 handler - Route niet gevonden
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Globale error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// START SERVER

const server = app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('  Workout Tracker API');
  console.log('='.repeat(50));
  console.log(`  Server draait op poort ${PORT}`);
  console.log(`  Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('');
  console.log('  Beschikbare endpoints:');
  console.log(`  - Documentatie: http://localhost:${PORT}`);
  console.log(`  - Workouts API:  http://localhost:${PORT}/api/workouts`);
  console.log(`  - Exercises API: http://localhost:${PORT}/api/exercises`);
  console.log('='.repeat(50));
});

// GRACEFUL SHUTDOWN

// Afhandeling van graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signaal ontvangen: sluit HTTP server');
  server.close(() => {
    console.log('HTTP server gesloten');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\nSIGINT signaal ontvangen: sluit HTTP server');
  server.close(() => {
    console.log('HTTP server gesloten');
    process.exit(0);
  });
});
