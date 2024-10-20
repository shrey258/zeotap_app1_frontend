# Rule Engine App

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Design Choices](#design-choices)
5. [Prerequisites](#prerequisites)
6. [Installation](#installation)
7. [Running the Application](#running-the-application)
8. [API Endpoints](#api-endpoints)
9. [Contributing](#contributing)
10. [License](#license)

## Introduction

The Rule Engine App is a powerful and flexible tool designed to create, manage, evaluate, and combine complex business rules. It provides a user-friendly interface for defining rules, evaluating data against these rules, and combining multiple rules to create more complex logic.

## Features

- Create and manage business rules with a simple, intuitive interface
- List and view all created rules
- Evaluate data against existing rules
- Combine multiple rules to create complex rule sets
- Responsive design for both desktop and mobile use

## Technologies Used

- Frontend:
  - React.js
  - Material-UI (MUI)
  - React Router
- Backend:
  - Node.js
  - Express.js
  - MongoDB

## Design Choices

1. **Modular Architecture**: The application is built using a modular component-based architecture, allowing for easy maintenance and scalability.

2. **Material-UI**: We chose Material-UI for its comprehensive set of pre-built components and its ability to create a consistent, modern look across the application.

3. **Dark Theme**: The app uses a dark theme by default, which is easier on the eyes for prolonged use and gives a modern feel to the application.

4. **Responsive Design**: The navbar and overall layout are designed to be responsive, providing a seamless experience across different device sizes.

5. **RESTful API**: The backend follows RESTful principles for clear and predictable API endpoints.

6. **MongoDB**: Chosen for its flexibility with unstructured data, which is beneficial for storing complex rule structures.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- MongoDB (v4.0 or later)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/rule-engine-app.git
   cd rule-engine-app
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

## Running the Application

1. Start the MongoDB service on your machine.

2. Start the backend server:
   ```
   cd backend
   npm start
   ```
   The server will start on `http://localhost:5000` by default.

3. In a new terminal, start the frontend development server:
   ```
   cd frontend
   npm start
   ```
   The React app will start on `http://localhost:3000`.

4. Open your browser and navigate to `http://localhost:3000` to use the application.

## API Endpoints

- `POST /api/rules`: Create a new rule
- `GET /api/rules`: Get all rules
- `POST /api/evaluate`: Evaluate data against rules
- `POST /api/combine`: Combine multiple rules

For detailed API documentation, please refer to the [API Documentation](API_DOCUMENTATION.md) file.

## Contributing

Contributions to the Rule Engine App are welcome. Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
