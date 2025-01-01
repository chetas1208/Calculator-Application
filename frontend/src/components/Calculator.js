// FILE: /frontend/src/components/Calculator.js

import React, { useState, useEffect, useCallback } from 'react';
import Display from './Display';
import CalculationHistory from './CalculationHistory';
import './Calculator.css';

function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  const handleButtonClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const calculateResult = useCallback(async () => {
    // Input validation
    if (!input) {
      setError('Please enter an expression to calculate.');
      return;
    }
    setError('');
    try {
      const operatorMatches = input.match(/[+\-*/]/g);

      if (!operatorMatches) {
        throw new Error('No operator found');
      }
      if (operatorMatches.length > 1) {
        throw new Error('Multiple operators found. Multi-operator expressions are not supported yet.');
      }

      const operator = operatorMatches[0];
      const numbers = input.split(/[+\-*/]/).map(Number);

      const operation = {
        '+': 'add',
        '-': 'subtract',
        '*': 'multiply',
        '/': 'divide'
      }[operator];

      if (!operation) {
        throw new Error('Invalid operation');
      }

      const response = await fetch('/api/calculations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operation, numbers }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Calculation failed');
      }

      const data = await response.json();
      setResult(data.result);
      fetchCalculationHistory();
    } catch (error) {
      setResult('Error');
      setError(error.message);
      console.error('Calculation error:', error);
    }
  }, [input]);

  const clearInput = () => {
    setInput('');
    setResult('');
    setError('');
  };

  const fetchCalculationHistory = useCallback(async () => {
    try {
      const response = await fetch('/api/calculations/history');
      if (!response.ok) {
        throw new Error('Failed to fetch calculation history.');
      }
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error('Error fetching calculation history:', error);
    }
  }, []);

  useEffect(() => {
    fetchCalculationHistory();
  }, [fetchCalculationHistory]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;
      if (key >= '0' && key <= '9') {
        handleButtonClick(key);
      } else if (['+', '-', '*', '/'].includes(key)) {
        handleButtonClick(key);
      } else if (key === 'Enter') {
        calculateResult();
      } else if (key === 'Escape') {
        clearInput();
      } else if (key === 'Backspace') {
        setInput((prevInput) => prevInput.slice(0, -1));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [calculateResult]);

  return (
    <div className="calculator-container">
      <div className="calculator">
        <Display input={input} result={result} isError={result === 'Error'} />
        <div className="buttons">
          <button onClick={() => handleButtonClick('1')}>1</button>
          <button onClick={() => handleButtonClick('2')}>2</button>
          <button onClick={() => handleButtonClick('3')}>3</button>
          <button onClick={() => handleButtonClick('+')}>+</button>
          <button onClick={() => handleButtonClick('4')}>4</button>
          <button onClick={() => handleButtonClick('5')}>5</button>
          <button onClick={() => handleButtonClick('6')}>6</button>
          <button onClick={() => handleButtonClick('-')}>-</button>
          <button onClick={() => handleButtonClick('7')}>7</button>
          <button onClick={() => handleButtonClick('8')}>8</button>
          <button onClick={() => handleButtonClick('9')}>9</button>
          <button onClick={() => handleButtonClick('*')}>*</button>
          <button onClick={calculateResult}>=</button>
          <button onClick={clearInput}>C</button>
        </div>
        {error && <div className="error">{error}</div>}
        <CalculationHistory history={history} />
      </div>
    </div>
  );
}

export default Calculator;