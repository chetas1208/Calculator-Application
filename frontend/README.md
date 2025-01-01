# mern-calculator-app/frontend/README.md

# MERN Calculator App

This is a simple calculator application built using the MERN stack (MongoDB, Express, React, Node.js). The application allows users to perform basic arithmetic operations and keeps a history of calculations.

## Project Structure

```
mern-calculator-app
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── app.js
│   └── server.js
├── frontend
│   ├── public
│   ├── src
│   ├── package.json
│   └── README.md
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```
   cd mern-calculator-app
   ```

3. Install backend dependencies:

   ```
   cd backend
   npm install
   ```

4. Install frontend dependencies:

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

The application should now be running on `http://localhost:3000`.

## Features

- Basic arithmetic operations: addition, subtraction, multiplication, and division.
- Calculation history stored in MongoDB.
- Responsive design for better user experience.

## Contributing

Feel free to submit issues or pull requests for any improvements or features you would like to see.

## License

This project is licensed under the MIT License.