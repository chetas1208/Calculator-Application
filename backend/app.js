// filepath: /d:/Udemy Cources/mern-calculator-app/backend/app.js

require('dotenv').config(); // Load environment variables

const express = require('express');
const cors = require('cors');
const calculationRoutes = require('./routes/calculationRoutes');
const conversionRoutes = require('./routes/conversionRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/calculations', calculationRoutes);
app.use('/api/conversions', conversionRoutes);

// Health Check Route
app.get('/', (req, res) => {
  res.send('MERN Calculator API is running');
});

// Handle Undefined Routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found.' });
});

module.exports = app;