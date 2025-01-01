const express = require('express');
const router = express.Router();
const calculationController = require('../controllers/calculationController');

// POST /api/calculations - Perform arithmetic calculation
router.post('/', calculationController.performCalculation);

// GET /api/calculations/history - Get calculation history
router.get('/history', calculationController.getCalculationHistory);

module.exports = router;