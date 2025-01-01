import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaCalculator, FaMoneyBillWave, FaInfoCircle, FaBars } from 'react-icons/fa';
import './VerticalNavbar.css';

function VerticalNavbar() {
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
        <ul className="side-navbar-links">
          <li>
            <NavLink exact to="/about" activeClassName="active" onClick={toggleSidebar}>
              <FaInfoCircle /> About
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/arithmetic" activeClassName="active" onClick={toggleSidebar}>
              <FaCalculator /> Arithmetic Calculator
            </NavLink>
          </li>
          <li>
            <NavLink to="/currency" activeClassName="active" onClick={toggleSidebar}>
              <FaMoneyBillWave /> Currency Calculator
            </NavLink>
          </li>
        </ul>
      </div>
      {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
}

export default VerticalNavbar;