const mongoose = require('mongoose');

const ScientificCalculationSchema = new mongoose.Schema({
  expression: {
    type: String,
    required: true
  },
  result: {
    type: Number,
    required: true
  },
  operation: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ScientificCalculation', ScientificCalculationSchema);