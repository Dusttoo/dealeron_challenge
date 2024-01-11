# Sales Taxes Calculator Application
![Sales tax calculator](https://i.imgur.com/bhoysA1.png)

## Overview

The Sales Taxes Calculator is a web application designed to simulate a store's checkout system. It allows customers to add items to their basket and generates a receipt with detailed pricing and tax information.

## Design and Assumptions

### Tax Calculations

- Basic sales tax is applied at a rate of 10% to all items except for books, food (chocolate), and medical products.
- An import duty of 5% is applied to all imported items, with no exceptions.

### Assumptions

- Chocolate is the only available food item.
- Tax rates are adjustable.
- The application does not handle free items (items with a price of zero).

### Real-World Scenario Considerations

- In a commercial environment, inventory items would likely be stored in a database.
- The database would include an items table (with item names and prices) and a categories table for classifying items.

## Running the Application Locally

### Prerequisites

- Node.js should be installed on your system.

### Steps

1. Clone the repository `https://github.com/Dusttoo/dealeron_challenge.git`.
2. Open a terminal and cd into `dealeron_challenge`.
3. Run `npm install` to install dependencies.
4. Build the application with `npm run build`.
5. Start the application using `npm start`.
6. Access the application in a web browser at `http://localhost:8080`.

### Running Tests

- Execute `npm test` in the terminal to run unit tests with Jest.

## Application Structure

- `Item`: Represents a sale item with name, price, and tax status.
- `TaxCalculator`: Handles tax calculations based on item properties.
- `Receipt`: Manages items and generates a receipt with taxes and total cost.
- `App.ts`: Main entry point, handling user interactions and UI.

## TypeScript Setup

The application is developed using TypeScript, a statically typed superset of JavaScript, which adds type safety and enhances code maintainability and readability. TypeScript is particularly useful in organizing the codebase into modules and classes, such as `Item`, `Receipt`, and `TaxCalculator`.

- **Modular Codebase**: TypeScript's module system is used to separate concerns and functionalities, making the codebase well-structured and scalable.
- **Type Safety**: TypeScript's type system ensures variables, parameters, and return types are consistent, reducing runtime errors and improving debugging.
- **Class-Based Approach**: Object-oriented principles are applied using TypeScript's class syntax to define entities like items and receipts with properties and methods.

## Integration of Webpack

Webpack is introduced as the module bundler and task runner for the application. It compiles TypeScript code into JavaScript, enabling the application to run in a web browser environment.

- **Bundling Modules**: Webpack bundles the various TypeScript modules into a single JavaScript file, making it browser-compatible.
- **Loaders and Plugins**: Utilized to transform and optimize the code. For instance, `ts-loader` is used to compile TypeScript into JavaScript.
- **Development Server**: Webpack's development server (`http-server`) is used for local testing, providing a live reloading feature for a faster development cycle.

## UI in the Browser

The application features a user interface that allows users to interactively add items, view calculated taxes, and generate receipts.

- **Dynamic Interaction**: The UI dynamically updates as users input item details, providing immediate feedback on taxes and total costs.
- **HTML and CSS**: The UI is designed with HTML for structure and CSS for styling, ensuring a user-friendly and visually appealing interface.

## Integration with Jest for Testing

Jest, a popular JavaScript testing framework, is integrated for writing and running unit tests, ensuring the application's logic is reliable and bug-free.


