// filepath: /frontend/src/components/CurrencyCalculator.js

import React, { useState, useEffect } from 'react';
import ConversionHistory from './ConversionHistory';
import CurrencyDisplay from './CurrencyDisplay';
import './CurrencyCalculator.css';
import { convertCurrency, getConversionHistory } from '../Api'; // Import updated API functions

function CurrencyCalculator() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getConversionHistory();
        console.log('Fetched history:', data);
        setHistory(data);
      } catch (error) {
        console.error('Error fetching history:', error);
        setError('Unable to load conversion history.');
      }
    };

    fetchHistory();
  }, []);

  const handleConvert = async () => {
    if (!amount || isNaN(amount)) {
      setResult('Please enter a valid amount.');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    try {
      console.log('Sending request to /api/conversions/calculate with:', { fromCurrency, toCurrency, amount });

      const data = await convertCurrency(fromCurrency, toCurrency, Number(amount));

      if (data.convertedAmount !== undefined) { // Check for convertedAmount
        console.log('Received response from /api/conversions/calculate:', data);
        setResult(`${amount} ${fromCurrency} = ${data.convertedAmount} ${toCurrency}`); // Use convertedAmount
        setHistory(prevHistory => [data, ...prevHistory]);
      } else {
        setResult(data.error || 'Conversion failed.');
      }
    } catch (error) {
      console.error('Conversion error:', error);
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
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
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          result={result}
          isError={!!error}
        />
        {error && <p className="error-message">{error}</p>}
      </div>
      <ConversionHistory history={history} />
    </div>
  );
}

export default CurrencyCalculator;