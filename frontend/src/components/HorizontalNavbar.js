import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaCalculator, FaMoneyBillWave, FaInfoCircle, FaSun, FaMoon } from 'react-icons/fa';
import './HorizontalNavbar.css';

function HorizontalNavbar({ darkMode, toggleDarkMode }) {
  return (
    <nav className="horizontal-navbar">
      <div className="navbar-logo">
        <h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Calculator</h2>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink exact to="/about" activeClassName="active">
            <FaInfoCircle /> About
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/arithmetic" activeClassName="active">
            <FaCalculator /> Arithmetic Calculator
          </NavLink>
        </li>
        <li>
          <NavLink to="/currency" activeClassName="active">
            <FaMoneyBillWave /> Currency Calculator
          </NavLink>
        </li>
      </ul>
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
    </nav>
  );
}

export default HorizontalNavbar;