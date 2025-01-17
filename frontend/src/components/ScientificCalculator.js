import React, { useState, useEffect, useCallback } from 'react';
import './ScientificCalculator.css';
import ScientificDisplay from './ScientificDisplay';
import ScientificHistory from './ScientificHistory';
import debounce from 'lodash.debounce';

const ScientificCalculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState(''); // Validation Messages
  const [loading, setLoading] = useState(false);

  // Fetch History
  const fetchHistory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/scientific/history');
      if (!response.ok) {
        throw new Error('Failed to fetch history');
      }
      const data = await response.json();
      setHistory(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching history:', error);
      setError('Unable to load history.');
      setLoading(false);
      setTimeout(() => setError(''), 2000);
    }
  }, []);

  useEffect(() => {
    fetchHistory();

    const interval = setInterval(() => {
      fetchHistory();
    }, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, [fetchHistory]);

  // Handle Delete Action
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/scientific/history/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete history item');
      }
      setMessage('History item deleted successfully.');
      setTimeout(() => setMessage(''), 2000);
      fetchHistory();
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
  const handleButtonClick = useCallback((value) => {
    setInput((prevInput) => prevInput + value);
    setError('');
  }, []);

  // Handle Backspace
  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
    setError('');
  };

  // Debounced Calculation
  const debouncedCalculation = useCallback(
    debounce(async (exp, op) => {
      try {
        const response = await fetch('/api/scientific/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ expression: exp, operation: op }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Calculation failed.');
        }

        const data = await response.json();
        setResult(data.result);
        setMessage('Calculation successful.');
        setTimeout(() => setMessage(''), 2000);
        fetchHistory();
      } catch (error) {
        console.error('Calculation error:', error);
        setError(error.message || 'Calculation failed.');
        setTimeout(() => setError(''), 2000);
      }
    }, 300),
    [fetchHistory]
  );

  // Calculate Result
  const calculateResult = useCallback(() => {
    if (!input) {
      setError('Please enter an expression to calculate.');
      setTimeout(() => setError(''), 2000);
      return;
    }

    const operation = input.match(/^[a-z]+/)?.[0] || 'multi';
    const expression = operation === 'multi' ?
      input : input.replace(/^[a-z]+\((.+)\)$/, '$1');

    debouncedCalculation(expression, operation);
  }, [input, debouncedCalculation]);

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
      if ((key >= '0' && key <= '9') || ['+', '-', '*', '/', '%', '(', ')', '.', 'π'].includes(key)) {
        handleButtonClick(key);
      } else if (key === 'Enter') {
        calculateResult();
      } else if (key === 'Backspace') {
        handleBackspace();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleButtonClick, calculateResult]);

  return (
    <div className="scientific-calculator">
      <ScientificDisplay
        input={input}
        result={result}
        error={error}
      />
      <div className="buttons">
        <button onClick={clearInput}>C</button>
        <button onClick={handleBackspace} className="backspace-button">⌫</button>
        <button onClick={() => handleButtonClick('sin(')}>sin</button>
        <button onClick={() => handleButtonClick('cos(')}>cos</button>
        <button onClick={() => handleButtonClick('tan(')}>tan</button>

        <button onClick={() => handleButtonClick('ln(')}>ln</button>
        <button onClick={() => handleButtonClick('log(')}>log</button>
        <button onClick={() => handleButtonClick('asin(')}>sin⁻¹</button>
        <button onClick={() => handleButtonClick('acos(')}>cos⁻¹</button>
        <button onClick={() => handleButtonClick('atan(')}>tan⁻¹</button>

        <button onClick={() => handleButtonClick('(')}>(</button>
        <button onClick={() => handleButtonClick('sqrt(')}>√</button>
        <button onClick={() => handleButtonClick('cbrt(')}>∛</button>
        <button onClick={() => handleButtonClick('!')}>!</button>
        <button onClick={() => handleButtonClick(')')}>)</button>

        <button onClick={() => handleButtonClick('%')}>%</button>
        <button onClick={() => handleButtonClick('7')}>7</button>
        <button onClick={() => handleButtonClick('8')}>8</button>
        <button onClick={() => handleButtonClick('9')}>9</button>
        <button onClick={() => handleButtonClick('/')}>/</button>

        <button onClick={() => handleButtonClick('π')}>π</button>
        <button onClick={() => handleButtonClick('4')}>4</button>
        <button onClick={() => handleButtonClick('5')}>5</button>
        <button onClick={() => handleButtonClick('6')}>6</button>
        <button onClick={() => handleButtonClick('*')}>×</button>

        <button onClick={() => handleButtonClick('.')}>.</button>
        <button onClick={() => handleButtonClick('1')}>1</button>
        <button onClick={() => handleButtonClick('2')}>2</button>
        <button onClick={() => handleButtonClick('3')}>3</button>
        <button onClick={() => handleButtonClick('+')} className="plus-button">+</button>

        <button onClick={() => handleButtonClick('0')}>0</button>
        <button onClick={() => handleButtonClick('-')}>-</button>
        <button onClick={calculateResult} className="equals-button">=</button>
      </div>
      {/* Display Validation Messages */}
      {message && <div className="validation-message animated">{message}</div>}
      {error && <div className="error animated">{error}</div>}
      {loading && <div className="loading">Loading history...</div>}
      <ScientificHistory history={history} onDelete={handleDelete} onCopy={handleCopy} />
    </div>
  );
};

export default ScientificCalculator;



