const express = require('express');
const router = express.Router();
const calculationController = require('../controllers/calculationController');

// POST /api/calculations - Perform arithmetic calculation
router.post('/', calculationController.performCalculation);

// GET /api/calculations/history - Get calculation history
router.get('/history', calculationController.getCalculationHistory);

// DELETE /api/calculations/history/:id - Delete a calculation history item
router.delete('/history/:id', calculationController.deleteCalculationHistory); // DELETE route

module.exports = router;