# Weather Application

## Overview

This is a real-time data processing system built with React and Tailwind CSS that fetches real-time weather data from the OpenWeatherMap API. The system monitors weather conditions and provides summarized insights using rollups and aggregates. Alerting mechanisms are also implementedd

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Dependencies](#dependencies)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [Build Instructions](#build-instructions)
- [Design Choices](#design-choices)
- [Key Components](#key-components)
- [Contributing](#contributing)

## Features

- **Real-time Weather Data**: Fetch and display weather data based on user input.
- **Responsive Design**: Built with Tailwind CSS for a mobile-friendly interface.
- **User-Friendly UI**: Simple and intuitive user interface for easy navigation.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **OpenWeatherMap API**: A service to fetch weather data based on city names.

## Dependencies

To set up and run this application, ensure you have the following dependencies installed:

- **Node.js**: Version 12 or higher.
- **npm**: Comes with Node.js. You can check if it's installed by running `npm -v`.

### Additional Dependencies

Run the following command to install project dependencies:

```bash
npm install
```
This will install the necessary packages listed in package.json, including:

react
react-dom
tailwindcss
postcss
autoprefixer

## Setup Instructions
- Clone the repository:

```bash
git clone https://github.com/saumya-singh13/weather-monitoring-system.git
cd weather-monitoring-system
```
- Install dependencies:

```bash
npm install
```
## Running the Application
To start the development server, run:
```bash
npm start
```
This will start the application in your default web browser at http://localhost:3000.

## Build Instructions
To create a production build of the application, run:

```bash
npm run build
```
This command will create an optimized production build in the build folder, which can be deployed to any static site hosting service.

## Design Choices
- Component-Based Architecture: The application is built using a component-based approach in React, allowing for reusability and better organization of code.
- Tailwind CSS for Styling: The utility-first approach of Tailwind CSS helps maintain a clean and organized styling structure, allowing for rapid UI development.
- Responsive Design: The application is designed to be responsive, ensuring a seamless experience across devices of different sizes.
## Key Components
- MainComponent: The primary component that handles user input and displays weather data.
- WeatherCard: A reusable component that displays the weather information for the searched city.

## Contributing
Contributions are welcome! If you have suggestions for improvements or new features, feel free to submit a pull request or open an issue.
