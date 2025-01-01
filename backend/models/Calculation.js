const mongoose = require('mongoose');

const CalculationSchema = new mongoose.Schema({
  operation: { type: String, required: true },
  numbers: { type: [Number], required: true },
  result: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Calculation', CalculationSchema);