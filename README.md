# Breakable Toy

**Breakable Toy** is an inventory management system that allows users to efficiently manage products. The application provides functionalities for creating, editing, and deleting products. Users can filter products by name, category, and availability. The system also displays overall and category-specific metrics for products. A data grid feature allows users to view products in a sortable and paginated table.

This project is built with **React**, **TypeScript**, and **Vite**, leveraging modern tools and libraries for a fast and scalable development experience.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Dependencies](#dependencies)
- [Development](#development)
- [Production](#production)
- [Functionality](#functionality)
- [Components](#components)
- [Services](#services)
- [Types](#types)
- [License](#license)

---

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

4. Open the application in your browser:
    ```
    http://localhost:5173
    ```

---

## Project Structure

The project structure is as follows:

```
breakable-toy/
├── node_modules/
├── public/
├── src/
│   ├── components/          # React components
│   ├── context/             # Global state management (ProductsContext)
│   ├── hooks/               # Custom hooks (e.g., useCategories, useMetrics)
│   ├── services/            # API service functions
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions (e.g., filtering logic)
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Entry point
│   ├── index.css            # Global styles
│   └── App.css              # Component-specific styles
├── .gitignore
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

---

## Available Scripts

In the project directory, you can run:

- **`npm run dev`**: Starts the development server.
- **`npm run build`**: Builds the app for production.
- **`npm run lint`**: Runs ESLint to check for linting errors.
- **`npm run preview`**: Previews the production build.

---

## Dependencies

The project uses the following dependencies:

- **React**: ^18.3.1
- **React DOM**: ^18.3.1
- **@mui/material**: ^6.3.0 (Material-UI for UI components)
- **@mui/x-data-grid**: ^7.23.3 (Data grid for displaying products)
- **@mui/x-date-pickers**: ^7.23.3 (Date picker for product expiration dates)
- **Axios**: ^1.7.9 (HTTP client for API requests)
- **Day.js**: ^1.11.13 (Date manipulation library)

---

## Development

During development, you can use the following tools and configurations:

- **Vite**: A fast build tool and development server.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **ESLint**: A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.

---

## Production

To build the project for production, run:

```sh
npm run build
```

This will create an optimized build of the application in the `dist` folder.

To preview the production build locally, run:

```sh
npm run preview
```

---

## Functionality

The application provides the following functionality:

- **Product Management**: Create, edit, and delete products.
- **Filtering**: Filter products by name, category, and availability.
- **Metrics**: Display overall and category-specific metrics for products.
- **Data Grid**: Display products in a sortable and paginated table.

---

## Components

### **Core Components**
- **`Filter`**: Provides filtering options for products.
- **`ProductTable`**: Displays a table of products with sorting and pagination.
- **`FormDialog`**: Dialog for creating a new product.
- **`EditProductDialog`**: Dialog for editing an existing product.
- **`MetricsTable`**: Displays metrics for products.

### **Reusable Components**
- **`MetricsRow`**: A reusable row component for displaying metrics in a table.

---

## Services

The project uses the following services for API communication:

- **`categoryService`**:
  - Fetches categories from the API.
  - Endpoint: `/api/categories`

- **`productService`**:
  - Fetches, creates, updates, and deletes products from the API.
  - Endpoints:
    - `/api/products` (GET, POST)
    - `/api/products/:id` (PUT, DELETE)
    - `/api/metrics` (GET)

---

## Types

The project uses TypeScript for type safety. Key types include:

- **`Product`**:
  ```ts
  export interface Product {
      id: number;
      idCategory: number;
      name: string;
      unitPrice: number;
      stock: number;
      expirationDate?: Date;
  }
  ```

- **`ProductWithCategoryDTO`**:
  ```ts
  export interface ProductWithCategoryDTO {
      id: number;
      idCategory: number;
      name: string;
      category: string;
      unitPrice: number;
      stock: number;
      expirationDate?: Date;
  }
  ```

- **`Filters`**:
  ```ts
  export interface Filters {
      searchName: string;
      category: string;
      availability: boolean | null;
  }
  ```

- **`Metric`**:
  ```ts
  export interface Metric {
      totalProducts: number;
      totalValue: number;
      averagePrice: number;
  }
  ```

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.