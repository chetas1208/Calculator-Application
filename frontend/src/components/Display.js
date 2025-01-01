import React from 'react';
import './Display.css';
import PropTypes from 'prop-types';

function Display({ input, result, isError }) {
  console.log('Display props:', { input, result, isError });
  return (
    <div className="display">
      <div className="input">{input}</div>
      <div className={`result ${isError ? 'error' : ''}`}>{result}</div>
    </div>
  );
}

Display.propTypes = {
  input: PropTypes.string.isRequired,
  result: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isError: PropTypes.bool.isRequired,
};

export default Display;