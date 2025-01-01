// filepath: /d:/Udemy Cources/mern-calculator-app/frontend/src/components/ConversionHistory.js

import React from 'react';
import PropTypes from 'prop-types';
import './ConversionHistory.css';

function ConversionHistory({ history }) {
  return (
    <div className="conversion-history">
      <h3>Currency Conversion History</h3>
      {history.length === 0 ? (
        <p>No conversion history available.</p>
      ) : (
        <ul>
          {history.map((item) => (
            <li key={item._id}>
              {item.amount} {item.fromCurrency} to {item.toCurrency} = {item.convertedAmount} at {new Date(item.createdAt).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

ConversionHistory.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      fromCurrency: PropTypes.string.isRequired,
      toCurrency: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      convertedAmount: PropTypes.number.isRequired,
      createdAt: PropTypes.string,
    })
  ).isRequired,
};

export default ConversionHistory;