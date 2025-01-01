// FILE: /backend/controllers/conversionController.js

const Conversion = require('../models/Conversion');
const fetch = require('node-fetch'); // Ensure node-fetch is installed: npm install node-fetch@2
require('dotenv').config(); // Load environment variables

// Controller function to handle currency conversion
// FILE: /backend/controllers/conversionController.js

const convertCurrency = async (req, res) => {
    const { fromCurrency, toCurrency, amount } = req.body;
  
    // Input validation
    if (!fromCurrency || !toCurrency || !amount) {
      return res.status(400).json({ error: 'Invalid input data.' });
    }
  
    try {
      const apiKey = process.env.CURRENCY_API_KEY;
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`
      );
      const data = await response.json();
  
      if (data.result !== 'success') {
        throw new Error('Failed to fetch currency rates.');
      }
  
      const rate = data.conversion_rates[toCurrency];
      if (!rate) {
        throw new Error('Invalid target currency.');
      }
  
      const convertedAmount = amount * rate;
  
      const conversion = new Conversion({
        fromCurrency,
        toCurrency,
        amount,
        convertedAmount,
      });
  
      await conversion.save();
  
      res.status(200).json({ convertedAmount });
    } catch (error) {
      console.error('Conversion error:', error.message);
      res.status(500).json({ error: 'Currency conversion failed.' });
    }
  };

// Controller function to fetch conversion history
const getConversionHistory = async (req, res) => {
  try {
    const history = await Conversion.find()
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching conversion history:', error.message);
    res.status(500).json({ error: 'Failed to fetch conversion history.' });
  }
};

module.exports = {
  convertCurrency,
  getConversionHistory,
};