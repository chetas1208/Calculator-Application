// filepath: /frontend/src/components/CurrencyCalculator.js

import React, { useState, useEffect, useCallback } from 'react';
import ConversionHistory from './ConversionHistory';
import CurrencyDisplay from './CurrencyDisplay';
import './CurrencyCalculator.css';
import { convertCurrency } from '../Api'; // Ensure this import exists

function CurrencyCalculator() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState(''); // Validation Messages


  // Define fetchHistory using useCallback
  const fetchHistory = useCallback(async () => {
    try {
      const response = await fetch('/api/conversions/history');
      if (!response.ok) {
        throw new Error('Failed to fetch conversion history');
      }
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error('Error fetching history:', error);
      setError('Unable to load conversion history.');
    }
  }, []);

  // Use fetchHistory inside useEffect and set up auto-refresh
  useEffect(() => {
    fetchHistory(); // Initial fetch

    const interval = setInterval(() => {
      fetchHistory();
    }, 50); // Refresh every 10 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, [fetchHistory]);

  // Handle conversion
  const handleConvert = async () => {
    if (!amount || isNaN(amount)) {
      setError('Please enter a valid amount.');
      return;
    }

    try {
      setLoading(true);
      const response = await convertCurrency(fromCurrency, toCurrency, amount);
      setResult(response.convertedAmount);
      setError('');
      // Optionally, fetchHistory() here to include the latest conversion
      fetchHistory();
    } catch (error) {
      setError(error.message || 'Conversion failed.');
      setResult('');
    } finally {
      setLoading(false);
    }
  };

  // Handle deletion of history item
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/conversions/history/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete history item');
      }
      // Show success message
      setMessage('History item deleted successfully.');
      // Remove message after 2 seconds
      setTimeout(() => setMessage(''), 2000);
      // Refresh history after deletion
      fetchHistory();
    } catch (error) {
      console.error('Error deleting history:', error);
      setError('Unable to delete history item.');
    }
  };

  // Handle copy to clipboard
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Copied to clipboard:', text);
        // Show success message
        setMessage('Text copied to clipboard.');
        // Remove message after 2 seconds
        setTimeout(() => setMessage(''), 2000);
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
        setError('Failed to copy to clipboard.');
      });
  };

  return (
    <div className="currency-calculator-container">
      <h2>Currency Converter</h2>
      <div className="converter-form">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          min="0"
        />
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
          <option value="AUD">AUD</option>
          <option value="CAD">CAD</option>
          <option value="CHF">CHF</option>
          <option value="CNY">CNY</option>
          <option value="INR">INR</option>
          <option value="BRL">BRL</option>
        </select>
        <span>to</span>
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
          <option value="AUD">AUD</option>
          <option value="CAD">CAD</option>
          <option value="CHF">CHF</option>
          <option value="CNY">CNY</option>
          <option value="INR">INR</option>
          <option value="BRL">BRL</option>
        </select>
        <button onClick={handleConvert} disabled={loading}>
          {loading ? 'Converting...' : 'Convert'}
        </button>
      </div>
      <div className="conversion-result">
        <CurrencyDisplay
          amount={amount}
          setAmount={setAmount}
          fromCurrency={fromCurrency}
          setFromCurrency={setFromCurrency}
          toCurrency={toCurrency}
          setToCurrency={setToCurrency}
          result={result}
          handleConvert={handleConvert}
          loading={loading}
          error={error}
        />
        {message && <div className="validation-message">{message}</div>}
        {error && <p className="error-message">{error}</p>}
      </div>
      <ConversionHistory history={history} onDelete={handleDelete} onCopy={handleCopy} />
    </div>
  );
}

export default CurrencyCalculator;