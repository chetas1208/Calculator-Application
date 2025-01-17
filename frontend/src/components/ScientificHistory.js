import React from 'react';
import PropTypes from 'prop-types';
import { FaCopy, FaTrash } from 'react-icons/fa';
import './ScientificHistory.css';

const ScientificHistory = ({ history, onDelete, onCopy }) => (
  <div className="scientific-history">
    <h3>Scientific Calculation History</h3>
    {history.length === 0 ? (
      <p>No calculation history available.</p>
    ) : (
      <ul>
        {history.map((item) => (
          <li key={item._id} className="history-item">
            <span>
              {`${item.expression} = ${item.result}`}
            </span>
            <div className="history-actions">
              <button 
                onClick={() => onCopy(`${item.expression} = ${item.result}`)} 
                title="Copy"
                className="action-button copy-button"
                aria-label="Copy expression to clipboard"
              >
                <FaCopy />
              </button>
              <button 
                onClick={() => onDelete(item._id)} 
                title="Delete"
                className="action-button delete-button"
                aria-label="Delete history item"
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

ScientificHistory.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      expression: PropTypes.string.isRequired,
      result: PropTypes.number.isRequired,
      operation: PropTypes.string.isRequired
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired
};

export default ScientificHistory;