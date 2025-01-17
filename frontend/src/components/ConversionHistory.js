import React from 'react';
import PropTypes from 'prop-types';
import { FaCopy, FaTrash } from 'react-icons/fa';
import './ConversionHistory.css';

function ConversionHistory({ history, onDelete, onCopy }) {
  return (
    <div className="conversion-history">
      <h3>Currency Conversion History</h3>
      {history.length === 0 ? (
        <p>No conversion history available.</p>
      ) : (
        <ul>
          {history.map((item) => (
            <li key={item._id} className="history-item">
              <span>
                {`${item.amount} ${item.fromCurrency} to ${item.toCurrency} = ${item.convertedAmount} at ${new Date(item.createdAt).toLocaleString()}`}
              </span>
              <div className="history-actions">
                <button 
                  onClick={() => onCopy(`${item.amount} ${item.fromCurrency} = ${item.convertedAmount} ${item.toCurrency}`)} 
                  title="Copy"
                  className="action-button copy-button"
                >
                  <FaCopy />
                </button>
                <button 
                  onClick={() => onDelete(item._id)} 
                  title="Delete"
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

ConversionHistory.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      fromCurrency: PropTypes.string.isRequired,
      toCurrency: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      convertedAmount: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
};

export default ConversionHistory;