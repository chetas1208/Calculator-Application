import React from 'react';
import PropTypes from 'prop-types';
import './CurrencyDisplay.css';

function CurrencyDisplay({ amount, fromCurrency, toCurrency, result, isError }) {
  return (
    <div className="currency-display">
      {isError ? (
        <p className="error-message">{result}</p>
      ) : (
        <h3>
          {amount ? `${Number(amount).toLocaleString()} ${fromCurrency} = ${Number(result).toLocaleString()} ${toCurrency}` : ''}
        </h3>
      )}
    </div>
  );
}

CurrencyDisplay.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  fromCurrency: PropTypes.string.isRequired,
  toCurrency: PropTypes.string.isRequired,
  result: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isError: PropTypes.bool.isRequired,
};

export default CurrencyDisplay;