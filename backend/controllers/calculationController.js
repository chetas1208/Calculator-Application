const Calculation = require('../models/Calculation');

const performCalculation = async (req, res) => {
  const { operation, numbers } = req.body;

  if (!operation || !numbers || !Array.isArray(numbers)) {
    return res.status(400).json({ error: 'Invalid input data.' });
  }

  try {
    let result;
    switch (operation) {
      case 'add':
        result = numbers.reduce((acc, num) => acc + num, 0);
        break;
      case 'subtract':
        result = numbers.reduce((acc, num) => acc - num);
        break;
      case 'multiply':
        result = numbers.reduce((acc, num) => acc * num, 1);
        break;
      case 'divide':
        result = numbers.reduce((acc, num) => acc / num);
        break;
      default:
        return res.status(400).json({ error: 'Invalid operation.' });
    }

    const calculations = new Calculation({ operation, numbers, result });
    await calculations.save();

    res.status(200).json({ result });
  } catch (error) {
    console.error('Calculation error:', error);
    res.status(500).json({ error: 'Calculation failed.' });
  }
};

const getCalculationHistory = async (req, res) => {
  try {
    const history = await Calculation.find().sort({ createdAt: -1 }).limit(10);
    res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching calculation history:', error);
    res.status(500).json({ error: 'Failed to fetch calculation history.' });
  }
};

module.exports = {
  performCalculation,
  getCalculationHistory,
};