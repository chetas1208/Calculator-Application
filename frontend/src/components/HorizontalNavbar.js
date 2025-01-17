import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaCalculator, FaMoneyBillWave, FaInfoCircle, FaSun, FaMoon } from 'react-icons/fa';
import './HorizontalNavbar.css';

function HorizontalNavbar() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 50); // Set to 50ms

    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="horizontal-navbar">
      <div className="navbar-logo">
        <h2>Calculator Pro</h2>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/about">
            <FaInfoCircle /> About
          </NavLink>
        </li>
        <li>
          <NavLink to="/arithmetic">
            <FaCalculator /> Quick Calculate
          </NavLink>
        </li>
      </ul>
      <div className="current-time">
        {time}
      </div>
    </nav>
  );
}

export default HorizontalNavbar;