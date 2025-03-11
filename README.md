# Breakable Toy

Breakable Toy is an inventory management system that allows users to manage products efficiently. The application provides functionalities for creating, editing, and deleting products. Users can filter products by name, category, and availability. The system also displays overall and category-specific metrics for products. The data grid feature allows users to view products in a sortable and paginated table.

This project is a React application built with TypeScript and Vite. It provides a minimal setup to get React working with Vite, including HMR (Hot Module Replacement) and some ESLint rules.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Dependencies](#dependencies)
- [Development](#development)
- [Production](#production)
- [ESLint Configuration](#eslint-configuration)
- [Functionality](#functionality)

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/isai-salazar-enc/breakable-toy-frontend
    cd breakable-toy
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm run dev
    ```

## Project Structure

The project structure is as follows:

```
breakable-toy/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   ├── services/
│   ├── types/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── App.css
├── .gitignore
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Runs ESLint to check for linting errors.
- `npm run preview`: Previews the production build.

## Dependencies

The project uses the following dependencies:

- `react`: ^18.3.1
- `react-dom`: ^18.3.1
- `@vitejs/plugin-react`: ^1.0.0
- `@vitejs/plugin-react-swc`: ^1.0.0
- `typescript`: ^4.5.4
- `vite`: ^2.7.2

## Development

During development, you can use the following tools and configurations:

- **Vite**: A fast build tool and development server.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **ESLint**: A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.

## Production

To build the project for production, run:

```sh
npm run build
```

This will create an optimized build of the application in the `dist` folder.

## Functionality

The application provides the following functionality:

- **Product Management**: Create, edit, and delete products.
- **Filtering**: Filter products by name, category, and availability.
- **Metrics**: Display overall and category-specific metrics for products.
- **Data Grid**: Display products in a data grid with sorting and pagination.

### Components

- `MetricsTable`: Displays metrics for products.
- `EditProductDialog`: Dialog for editing a product.
- `ProductTable`: Displays a table of products.
- `Filter`: Provides filtering options for products.
- `FormDialog`: Dialog for creating a new product.

### Services

- `categoryService`: Fetches categories from the API.
- `productService`: Fetches, creates, updates, and deletes products from the API.

### Types

- `Product`: Defines the structure of a product.
- `ProductWithCategoryDTO`: Defines the structure of a product with category information.
- `Category`: Defines the structure of a category.