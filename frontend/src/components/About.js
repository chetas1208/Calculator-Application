import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-page">
      <h2>About MERN Calculator App</h2>
      <p className="intro-text">
        Experience the power of modern web development with our MERN Calculator App! 
        Built using MongoDB, Express, React, and Node.js, this app combines sleek design 
        with powerful functionality.
      </p>
      <p>
        ✨ Features include:
        <ul className="feature-list">
          <li>
            <strong>Advanced Arithmetic Operations:</strong> Addition, subtraction, 
            multiplication, division, and modulo with multi-operator support
          </li>
          <li>
            <strong>Real-time Currency Conversion:</strong> Live exchange rates 
            for major world currencies with instant calculations
          </li>
          <li>
            <strong>Smart History Tracking:</strong> Automatic saving of all 
            calculations and conversions with elegant animations
          </li>
          <li>
            <strong>Responsive Design:</strong> Seamless experience across all 
            devices with smooth transitions
          </li>
          <li>
            <strong>Dynamic UI Features:</strong>
            <ul>
              <li>Elegant dark/light mode transitions</li>
              <li>Interactive button animations</li>
              <li>Real-time error handling with visual feedback</li>
              <li>Keyboard support for rapid calculations</li>
            </ul>
          </li>
        </ul>
      </p>
      <p className="closing-text">
        Discover how the MERN stack brings together beautiful design and powerful 
        functionality in this modern calculator application. Try our features and 
        experience the smooth animations and intuitive interface yourself!
      </p>
    </div>
  );
}

export default About;