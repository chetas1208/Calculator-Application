import React from 'react';
import PropTypes from 'prop-types';
import './ScientificDisplay.css';

const ScientificDisplay = ({ input, result, error }) => (
  <div className="scientific-display">
    <input type="text" value={input} readOnly className="input" />
    <div className={`result ${error ? 'error' : ''}`}>
      {error || result || '0'}
    </div>
  </div>
);

ScientificDisplay.propTypes = {
  input: PropTypes.string.isRequired,
  result: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  error: PropTypes.string
};

export default ScientificDisplay;