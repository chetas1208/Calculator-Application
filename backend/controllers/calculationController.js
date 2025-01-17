const Calculation = require('../models/Calculation');

const performCalculation = async (req, res) => {
  const { expression, numbers, operators } = req.body;

  try {
    // Evaluate expression with operator precedence
    const evaluate = (nums, ops) => {
      // First pass: multiply, divide, modulo
      for (let i = 0; i < ops.length; i++) {
        if (['*', '/', '%'].includes(ops[i])) {
          let result;
          switch (ops[i]) {
            case '*': result = nums[i] * nums[i + 1]; break;
            case '/': 
              if (nums[i + 1] === 0) throw new Error('Division by zero');
              result = nums[i] / nums[i + 1];
              break;
            case '%':
              if (nums[i + 1] === 0) throw new Error('Modulo by zero');
              result = nums[i] % nums[i + 1];
              break;
          }
          nums.splice(i, 2, result);
          ops.splice(i, 1);
          i--;
        }
      }
      
      // Second pass: addition, subtraction
      let result = nums[0];
      for (let i = 0; i < ops.length; i++) {
        switch (ops[i]) {
          case '+': result += nums[i + 1]; break;
          case '-': result -= nums[i + 1]; break;
        }
      }
      return result;
    };

    const result = evaluate([...numbers], [...operators]);
    
    const calculation = new Calculation({
      operation: 'multi',
      expression,
      numbers,
      result
    });
    await calculation.save();

    res.status(200).json({ result });
  } catch (error) {
    console.error('Calculation error:', error);
    res.status(500).json({ error: error.message || 'Calculation failed.' });
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

const deleteCalculationHistory = async (req, res) => {
  try {
    await Calculation.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'History deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  performCalculation,
  getCalculationHistory,
  deleteCalculationHistory
};