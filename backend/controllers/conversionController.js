const Conversion = require('../models/Conversion');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const convertCurrency = async (req, res) => {
    const { fromCurrency, toCurrency, amount } = req.body;
    
    if (!process.env.CURRENCY_API_KEY) {
        return res.status(500).json({ error: 'API key not configured' });
    }

    try {
        const apiKey = process.env.CURRENCY_API_KEY;
        const response = await fetch(
            `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`
        );
        
        const data = await response.json();

        if (response.status !== 200) {
            throw new Error(`API Error: ${data.error || 'Unknown error'}`);
        }

        const rate = data.conversion_rates[toCurrency];
        if (!rate) {
            throw new Error('Invalid currency pair');
        }

        const convertedAmount = (amount * rate).toFixed(2);
        
        const conversion = new Conversion({
            fromCurrency,
            toCurrency,
            amount: Number(amount),
            convertedAmount: Number(convertedAmount)
        });

        await conversion.save();
        
        res.status(200).json({ 
            convertedAmount,
            fromCurrency,
            toCurrency,
            amount 
        });
    } catch (error) {
        console.error('Conversion error:', error);
        res.status(500).json({ error: error.message || 'Currency conversion failed' });
    }
};

const getConversionHistory = async (req, res) => {
    try {
        const history = await Conversion.find().sort({ createdAt: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch conversion history' });
    }
};
const deleteConversionHistory = async (req, res) => {
    try {
      await Conversion.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'History deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  module.exports = {
    convertCurrency,
    getConversionHistory,
    deleteConversionHistory
  };