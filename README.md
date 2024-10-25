# Rule Engine App Frontend

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

The Rule Engine App is a powerful and flexible tool designed to create, manage, evaluate, and combine complex business rules. This repository contains the frontend part of the application, providing a user-friendly interface for defining rules, evaluating data against these rules, and combining multiple rules to create more complex logic.

## Features

- Create and manage business rules with a simple, intuitive interface
- List and view all created rules
- Evaluate data against existing rules
- Combine multiple rules to create complex rule sets
- Responsive design for both desktop and mobile use

## Technologies Used

- React.js
- Material-UI (MUI)
- React Router
- Axios for API calls

## Design Choices

1. **Modular Architecture**: The application is built using a modular component-based architecture, allowing for easy maintenance and scalability.

2. **Material-UI**: We chose Material-UI for its comprehensive set of pre-built components and its ability to create a consistent, modern look across the application.

3. **Dark Theme**: The app uses a dark theme by default, which is easier on the eyes for prolonged use and gives a modern feel to the application.

4. **Responsive Design**: The navbar and overall layout are designed to be responsive, providing a seamless experience across different device sizes.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/shrey258/zeotap_app1_frontend.git
   cd zeotap_app1_frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Running the Application

1. Start the frontend development server:
   ```
   npm start
   ```
   The React app will start on `http://localhost:3000`.

2. Open your browser and navigate to `http://localhost:3000` to use the application.

Note: This frontend application requires the backend to be running. The backend repository can be found at [https://github.com/shrey258/zeotap_app1_backend](https://github.com/shrey258/zeotap_app1_backend).

## API Endpoints

The frontend interacts with the following API endpoints:

- `POST /api/rules/create`: Create a new rule
- `GET /api/rules`: Get all rules
- `POST /api/rules/evaluate`: Evaluate data against rules
- `POST /api/rules/combine`: Combine multiple rules

These endpoints are handled by the backend application.

## Project Structure

```
zeotap_app1_frontend/
├── .vercel/
├── build/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   ├── services/
│   ├── styles/
│   ├── .env
│   ├── App.js
│   └── index.js
├── .gitignore
├── LICENSE
├── package-lock.json
├── package.json
└── README.md
```

## Contributing

Contributions to the Rule Engine App Frontend are welcome. Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
