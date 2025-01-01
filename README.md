# mern-calculator-app/mern-calculator-app/README.md

# MERN Calculator App

This is a simple calculator application built using the MERN stack (MongoDB, Express, React, Node.js). The project is structured to provide a clear separation between the frontend and backend, making it easy to maintain and scale.

## Project Structure

```
mern-calculator-app
├── backend
│   ├── controllers
│   │   └── calculatorController.js
│   ├── models
│   │   └── calculation.js
│   ├── routes
│   │   └── calculatorRoutes.js
│   ├── app.js
│   └── server.js
├── frontend
│   ├── public
│   │   └── index.html
│   ├── src
│   │   ├── components
│   │   │   ├── Calculator.js
│   │   │   └── Display.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── reportWebVitals.js
│   ├── package.json
│   └── README.md
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
