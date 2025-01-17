import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FaCalculator, FaMoneyBillWave, FaInfoCircle, FaBars, FaSun, FaMoon } from 'react-icons/fa';
import './VerticalNavbar.css';

function VerticalNavbar({ darkMode, toggleDarkMode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <button className="hamburger" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <div className={`side-navbar ${sidebarOpen ? 'open' : ''}`}>
        <div className="mode-toggle">
          <button onClick={toggleDarkMode}>
            {darkMode ? <FaSun /> : <FaMoon />}
            {darkMode ? ' Light Mode' : ' Dark Mode'}
          </button>
        </div>
        <ul className="side-navbar-links">
          <li className="nav-section">
            <h3>Tools</h3>
            <NavLink to="/currency">
              <FaMoneyBillWave /> Currency Convert
            </NavLink>
            <NavLink to="/advanced">
              <FaCalculator /> Advanced Calc
            </NavLink>
          </li>
        </ul>
      </div>
      {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
}

VerticalNavbar.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired
};

export default VerticalNavbar;