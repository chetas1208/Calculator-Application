# MERN Calculator App

The MERN Calculator App is a comprehensive calculator application built using the MERN stack (MongoDB, Express, React, Node.js). This application allows users to perform both arithmetic and currency calculations, providing a user-friendly interface and maintaining a history of all calculations. The project is structured to provide a clear separation between the frontend and backend, making it easy to maintain and scale.

## Features

- **Arithmetic Calculator:** Perform basic operations like addition, subtraction, multiplication, and division.
- **Currency Calculator:** Convert amounts between different currencies using real-time exchange rates.
- **Calculation History:** View a history of all performed calculations.
- **Responsive Design:** Optimized for various screen sizes and devices.
- **Dark and Light Modes:** Toggle between dark and light themes for better user experience.

```
mern-calculator-app
├── backend
│ ├── controllers
│ │ ├── calculationController.js
│ │ └── conversionController.js
│ ├── models
│ │ ├── calculation.js
│ │ └── conversion.js
│ ├── routes
│ │ ├── calculationRoutes.js
│ │ └── conversionRoutes.js
│ ├── app.js
│ └── server.js
├── frontend
│ ├── public
│ │ └── index.html
│ ├── src
│ │ ├── components
│ │ │ ├── About.js
│ │ │ ├── Calculator.js
│ │ │ ├── CalculationHistory.js
│ │ │ ├── ConversionHistory.js
│ │ │ ├── CurrencyCalculator.js
│ │ │ ├── CurrencyDisplay.js
│ │ │ ├── Display.js
│ │ │ ├── HorizontalNavbar.js
│ │ │ └── VerticalNavbar.js
│ │ ├── Api.js
│ │ ├── App.js
│ │ ├── index.js
│ │ └── App.css
│ ├── package.json
│ └── README.md
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- React.js
- Express.js
- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd mern-calculator-app
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   node server.js
   ```

2. Start the frontend application:
   ```
   cd frontend
   npm start
   ```

### Usage

- Open your browser and navigate to `http://localhost:3000` to access the calculator application.
- Use the calculator to perform basic arithmetic operations.

### Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements for the project.

### License

This project is licensed under the MIT License.
