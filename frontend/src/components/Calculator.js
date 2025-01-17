// FILE: /frontend/src/components/Calculator.js

import React, { useState, useEffect, useCallback } from 'react';
import './Calculator.css';
import Display from './Display';
import CalculationHistory from './CalculationHistory';

function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [message, setMessage] = useState(''); // Validation Messages
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch Calculation History
  const fetchCalculationHistory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/calculations/history');
      if (!response.ok) {
        throw new Error('Failed to fetch calculation history');
      }
      const data = await response.json();
      setHistory(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching calculation history:', error);
      setError('Unable to load calculation history.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCalculationHistory();

    const interval = setInterval(() => {
      fetchCalculationHistory();
    }, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, [fetchCalculationHistory]);

  // Handle Delete Action
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/calculations/history/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete history item');
      }
      setMessage('History item deleted successfully.');
      setTimeout(() => setMessage(''), 2000);
      fetchCalculationHistory();
    } catch (error) {
      console.error('Error deleting history:', error);
      setError('Unable to delete history item.');
      setTimeout(() => setError(''), 2000);
    }
  };

  // Handle Copy Action
  const handleCopy = (expression) => {
    navigator.clipboard.writeText(expression)
      .then(() => {
        setMessage('Expression copied to clipboard.');
        setTimeout(() => setMessage(''), 2000);
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
        setError('Failed to copy to clipboard.');
        setTimeout(() => setError(''), 2000);
      });
  };

  // Handle Button Click
  const handleButtonClick = (value) => {
    setInput((prevInput) => prevInput + value);
    setError('');
  };

  // Handle Backspace
  const handleBackspace = () => {
    setInput(prev => prev.slice(0, -1));
    setError('');
  };

  // Calculate Result
  const calculateResult = useCallback(async () => {
    if (!input) {
      setError('Please enter an expression to calculate.');
      return;
    }

    setError('');
    try {
      const response = await fetch('/api/calculations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expression: input, numbers: extractNumbers(input), operators: extractOperators(input) }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Calculation failed.');
      }

      const data = await response.json();
      setResult(data.result);
      setMessage('Calculation successful.');
      setTimeout(() => setMessage(''), 2000);
      fetchCalculationHistory();
    } catch (error) {
      console.error('Calculation error:', error);
      setError(error.message || 'Calculation failed.');
      setTimeout(() => setError(''), 2000);
    }
  }, [input, fetchCalculationHistory]);

  // Extract Numbers from Input
  const extractNumbers = (expr) => {
    return expr.split(/[+\-*/%]/).map(Number);
  };

  // Extract Operators from Input
  const extractOperators = (expr) => {
    return expr.match(/[+\-*/%]/g) || [];
  };

  // Clear Input and Result
  const clearInput = () => {
    setInput('');
    setResult('');
    setError('');
    setMessage('');
  };

  // Handle Keyboard Input
  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;
      if ((key >= '0' && key <= '9') || ['+', '-', '*', '/', '%'].includes(key)) {
        handleButtonClick(key);
      } else if (key === 'Enter') {
        calculateResult();
      } else if (key === 'Backspace') {
        handleBackspace();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [calculateResult]);

  return (
    <div className="calculator-container">
      <div className="calculator">
        <Display input={input} result={result} error={error} />
        <div className="buttons">
          <button onClick={clearInput}>C</button>
          <button onClick={() => handleButtonClick('7')}>7</button>
          <button onClick={() => handleButtonClick('8')}>8</button>
          <button onClick={() => handleButtonClick('9')}>9</button>
          <button onClick={handleBackspace}>⌫</button>


          <button onClick={() => handleButtonClick('%')}>%</button>
          <button onClick={() => handleButtonClick('4')}>4</button>
          <button onClick={() => handleButtonClick('5')}>5</button>
          <button onClick={() => handleButtonClick('6')}>6</button>
          <button onClick={() => handleButtonClick('+')}>+</button>

          <button onClick={calculateResult} className="button-rect-vertical">=</button>
          <button onClick={() => handleButtonClick('1')}>1</button>
          <button onClick={() => handleButtonClick('2')}>2</button>
          <button onClick={() => handleButtonClick('3')}>3</button>
          <button onClick={() => handleButtonClick('-')}>-</button>

          <button onClick={() => handleButtonClick('0')} className="button-rect-horizontal">0</button>
          <button onClick={() => handleButtonClick('/')}>/</button>
          <button onClick={() => handleButtonClick('*')}>*</button>
        </div>
        {/* Display Validation Messages */}
        {message && <div className="validation-message">{message}</div>}

        {error && <div className="error">{error}</div>}
        <CalculationHistory history={history} onDelete={handleDelete} onCopy={handleCopy} />
        {loading && <div className="loading">Loading history...</div>}
      </div>
    </div>
  );
}

export default Calculator;