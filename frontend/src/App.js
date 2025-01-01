// filepath: /d:/Udemy Cources/mern-calculator-app/frontend/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Calculator from './components/Calculator';
import CurrencyCalculator from './components/CurrencyCalculator';
import HorizontalNavbar from './components/HorizontalNavbar';
import VerticalNavbar from './components/VerticalNavbar';
import About from './components/About';
import './App.css'; // Ensure this includes global styles

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
        <HorizontalNavbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <VerticalNavbar />
        <main>
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/arithmetic" element={<Calculator />} />
            <Route path="/currency" element={<CurrencyCalculator />} />
            {/* Redirect all unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;