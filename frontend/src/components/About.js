import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-page">
      <h2>About MERN Calculator App</h2>
      <p>
        The MERN Calculator App is a comprehensive tool built using the MERN stack (MongoDB, Express, React, Node.js). It offers both arithmetic and currency calculations with a user-friendly interface and keeps track of your calculation history.
      </p>
      <p>
        Features include:
        <ul>
          <li>Basic arithmetic operations: addition, subtraction, multiplication, and division.</li>
          <li>Currency conversion with real-time exchange rates.</li>
          <li>Calculation and conversion history.</li>
          <li>Dark and light mode themes.</li>
        </ul>
      </p>
      <p>
        Created to demonstrate the power and flexibility of the MERN stack in building full-stack applications.
      </p>
    </div>
  );
}

export default About;