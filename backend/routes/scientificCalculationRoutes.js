const express = require('express');
const router = express.Router();
const { 
  performScientificCalculation, 
  getScientificHistory,
  deleteScientificHistory 
} = require('../controllers/scientificCalculationController');

router.post('/calculate', performScientificCalculation);
router.get('/history', getScientificHistory);
router.delete('/history/:id', deleteScientificHistory); // DELETE route

module.exports = router;