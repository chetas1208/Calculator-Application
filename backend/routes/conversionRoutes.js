// FILE: /backend/routes/conversionRoutes.js

const express = require('express');
const router = express.Router();
const conversionController = require('../controllers/conversionController');

// POST /api/conversions/calculate - Perform currency conversion
router.post('/calculate', conversionController.convertCurrency);

// GET /api/conversions/history - Get conversion history
router.get('/history', conversionController.getConversionHistory);

module.exports = router;