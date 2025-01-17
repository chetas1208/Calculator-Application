import React from 'react';
import './CalculationHistory.css';
import PropTypes from 'prop-types';
import { FaCopy, FaTrash } from 'react-icons/fa';

function CalculationHistory({ history, onDelete, onCopy }) {
  const getOperationSymbol = (operation) => {
    const symbols = {
      add: '+',
      subtract: '-',
      multiply: '*',
      divide: '/',
      modulo: '%',
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
            <li key={item._id} className="history-item">
              <span>
                {item.expression ? 
                  `${item.expression} = ${item.result}` :
                  `${item.numbers.join(` ${getOperationSymbol(item.operation)} `)} = ${item.result}`
                }
              </span>
              <div className="history-actions">
                <button 
                  onClick={() => onCopy(item.expression ? `${item.expression} = ${item.result}` : `${item.numbers.join(` ${getOperationSymbol(item.operation)} `)} = ${item.result}`)} 
                  title="Copy"
                  aria-label="Copy expression to clipboard"
                  className="action-button copy-button"
                >
                  <FaCopy />
                </button>
                <button 
                  onClick={() => onDelete(item._id)} 
                  title="Delete"
                  aria-label="Delete calculation from history"
                  className="action-button delete-button"
                >
                  <FaTrash />
                </button>
              </div>
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
  onDelete: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired
};

export default CalculationHistory;