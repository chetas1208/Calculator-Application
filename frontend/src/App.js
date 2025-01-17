import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Calculator from './components/Calculator';
import CurrencyCalculator from './components/CurrencyCalculator';
import HorizontalNavbar from './components/HorizontalNavbar';
import VerticalNavbar from './components/VerticalNavbar';
import About from './components/About';
import './App.css'; // Ensure this includes global styles
import ScientificCalculator from './components/ScientificCalculator';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
        <VerticalNavbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <HorizontalNavbar />
        <main>
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/about" element={<About />} />
            <Route path="/arithmetic" element={<Calculator />} />
            <Route path="/currency" element={<CurrencyCalculator />} />
            <Route path="/advanced" element={<ScientificCalculator />} />
            {/* Redirect all unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;