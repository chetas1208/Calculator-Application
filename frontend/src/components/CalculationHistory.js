import React from 'react';
import './CalculationHistory.css';
import PropTypes from 'prop-types';

function CalculationHistory({ history }) {
  const getOperationSymbol = (operation) => {
    const symbols = {
      add: '+',
      subtract: '-',
      multiply: '*',
      divide: '/',
    };
    return symbols[operation] || operation;
  };

  return (
    <div className="calculation-history">
      <h3>Calculation History</h3>
      {history.length === 0 ? (
        <p>No calculation history available.</p>
      ) : (
        <ul>
          {history.map((item) => (
            <li key={item._id}>
              {item.numbers.join(` ${getOperationSymbol(item.operation)} `)} = {item.result}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

CalculationHistory.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      operation: PropTypes.string.isRequired,
      numbers: PropTypes.arrayOf(PropTypes.number).isRequired,
      result: PropTypes.number.isRequired,
      createdAt: PropTypes.string,
    })
  ).isRequired,
};

export default CalculationHistory;