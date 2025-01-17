const ScientificCalculation = require('../models/ScientificCalculation');

const factorial = (n) => {
  if (n < 0) throw new Error('Factorial not defined for negative numbers');
  if (n === 0) return 1;
  return n * factorial(n - 1);
};

const performScientificCalculation = async (req, res) => {
  const { expression, operation } = req.body;
  
  try {
    let result;
    let value;

    // Handle multi-operation expressions
    if (operation === 'multi') {
      // Replace functions with Math equivalents
      const sanitizedExpression = expression
        .replace(/π/g, 'Math.PI')
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/cbrt\(/g, 'Math.cbrt(')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/asin\(/g, 'Math.asin(')
        .replace(/acos\(/g, 'Math.acos(')
        .replace(/atan\(/g, 'Math.atan(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/!/, 'factorial');

      // Define factorial in the eval scope
      const evalResult = eval(sanitizedExpression);
      result = evalResult;
    } else {
      value = parseFloat(expression);

      switch(operation) {
        case 'sqrt':
          if (value < 0) throw new Error('Cannot calculate square root of negative number');
          result = Math.sqrt(value);
          break;
        case 'cbrt':
          result = Math.cbrt(value);
          break;
        case 'factorial':
          if (!Number.isInteger(value)) throw new Error('Factorial only defined for integers');
          result = factorial(value);
          break;
        case 'ln':
          if (value <= 0) throw new Error('Natural log only defined for positive numbers');
          result = Math.log(value);
          break;
        case 'log':
          if (value <= 0) throw new Error('Log only defined for positive numbers');
          result = Math.log10(value);
          break;
        case 'sin':
          result = Math.sin(value * Math.PI / 180);
          break;
        case 'cos':
          result = Math.cos(value * Math.PI / 180);
          break;
        case 'tan':
          result = Math.tan(value * Math.PI / 180);
          break;
        case 'asin':
          if (Math.abs(value) > 1) throw new Error('Invalid input for arcsin');
          result = Math.asin(value) * 180 / Math.PI;
          break;
        case 'acos':
          if (Math.abs(value) > 1) throw new Error('Invalid input for arccos');
          result = Math.acos(value) * 180 / Math.PI;
          break;
        case 'atan':
          result = Math.atan(value) * 180 / Math.PI;
          break;
        case 'percent':
          result = value / 100;
          break;
        default:
          throw new Error('Invalid operation');
      }
    }

    const calculation = new ScientificCalculation({
      expression,
      result,
      operation
    });

    await calculation.save();
    res.status(200).json({ result: parseFloat(result.toFixed(8)) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getScientificHistory = async (req, res) => {
  try {
    const history = await ScientificCalculation.find().sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteScientificHistory = async (req, res) => {
  try {
    await ScientificCalculation.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'History deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  performScientificCalculation,
  getScientificHistory,
  deleteScientificHistory
};