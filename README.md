# Calculator App

![Calculator App](./frontend/public/images/calculator-app-banner.png)

This is a feature-rich calculator application built using the MERN stack (MongoDB, Express, React, Node.js). The app provides an intuitive interface for performing arithmetic, currency conversions, and scientific calculations. Designed with scalability and maintainability in mind, it ensures a seamless user experience across devices.

## Technologies Used

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
=======
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
│   ├── controllers
│   │   ├── calculatorController.js
│   │   ├── currencyController.js
│   │   ├── scientificCalculationController.js
│   ├── models
│   │   ├── calculation.js
│   │   ├── currency.js
│   │   ├── scientificCalculation.js
│   ├── routes
│   │   ├── calculatorRoutes.js
│   │   ├── currencyRoutes.js
│   │   ├── scientificCalculationRoutes.js
│   ├── app.js
│   └── server.js
├── frontend
│   ├── public
│   │   ├── index.html
│   │   └── images
│   │       ├── calculator-app-banner.png
│   │       ├── arithmetic-calculator.png
│   │       ├── currency-calculator.png
│   │       └── scientific-calculator.png
│   ├── src
│   │   ├── components
│   │   │   ├── About.js
│   │   │   ├── Calculator.js
│   │   │   ├── CurrencyCalculator.js
│   │   │   ├── Display.js
│   │   │   ├── HorizontalNavbar.js
│   │   │   ├── ScientificCalculator.js
│   │   │   ├── ScientificDisplay.js
│   │   │   ├── ScientificHistory.js
│   │   │   ├── VerticalNavbar.js
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── reportWebVitals.js
│   ├── package.json
│   └── README.md
=======
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

## Features

- **Arithmetic Calculator**: Perform basic arithmetic operations.
- **Currency Calculator**: Convert between different currencies.
- **Scientific Calculator**: Perform advanced mathematical calculations.
- **Dark Mode**: Toggle between light and dark themes.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.

## Screenshots

### Arithmetic Calculator
![Arithmetic Calculator](./frontend/public/images/arithmetic-calculator.png)

### Currency Calculator
![Currency Calculator](./frontend/public/images/currency-calculator.png)

### Scientific Calculator
![Scientific Calculator](./frontend/public/images/scientific-calculator.png)

## Getting Started

### Prerequisites

- React.js
- Express.js
- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/mern-calculator-app.git
   cd mern-calculator-app
   ```

2. Install dependencies for both backend and frontend:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

4. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.


## Repository Views

![GitHub repo views](https://komarev.com/ghpvc/?username=your-username&repo=mern-calculator-app&color=blue)

## Contact
For any inquiries, please contact [Email](mailto:chetas.n.parekh@gmail.com).


##
This project is licensed under the MIT License.
