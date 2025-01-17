require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const conversionRoutes = require('./routes/conversionRoutes');
const calculationRoutes = require('./routes/calculationRoutes');
const scientificCalculationRoutes = require('./routes/scientificCalculationRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/conversions', conversionRoutes);
app.use('/api/calculations', calculationRoutes);
app.use('/api/scientific', scientificCalculationRoutes);

const PORT = process.env.PORT || 5000;

// Updated MongoDB connection without deprecated options
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  });