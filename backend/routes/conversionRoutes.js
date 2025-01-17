const express = require('express');
const router = express.Router();
const { 
  convertCurrency, 
  getConversionHistory, 
  deleteConversionHistory 
} = require('../controllers/conversionController');

router.post('/calculate', convertCurrency);
router.get('/history', getConversionHistory);
router.delete('/history/:id', deleteConversionHistory); // DELETE route

module.exports = router;