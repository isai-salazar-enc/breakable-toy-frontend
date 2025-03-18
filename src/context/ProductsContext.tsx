import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductWithCategoryDTO } from '../types/ProductWithCategoryDTO';
import { Filters } from '../types/Filters';
import { fetchProductsWithCategory, createNewProduct, saveProduct, deleteProduct } from '../services/productService';
import { filterProducts } from '../utils/filtering';
import { Product } from '../types/Product';
import axios from 'axios';

interface ProductsContextProps {
  products: ProductWithCategoryDTO[];
  size: number; // Represents the total number of products
  filteredProducts: ProductWithCategoryDTO[];
  filters: Filters;
  errorMessage: string | null;
  setFilters: (filters: Filters) => void;
  handleCreateProduct: (formProduct: Omit<Product, 'id'>) => Promise<void>;
  handleSaveProduct: (formProduct: Product) => Promise<void>;
  handleDeleteProduct: (productId: number) => Promise<void>;
  handleFilterProducts: (newFilters: Filters) => void;
}

const ProductsContext = createContext<ProductsContextProps | undefined>(undefined);

/**
 * Provides the `ProductsContext` to its children, managing the state and operations
 * related to products, including fetching, creating, updating, and deleting products.
 */
export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductWithCategoryDTO[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductWithCategoryDTO[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    searchName: '',
    category: '',
    availability: null,
  });

  // Fetch products from API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProductsWithCategory();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        setErrorMessage('Error fetching products.');
      }
    };

    loadProducts();
  }, []);

  // Handle product creation
  const handleCreateProduct = async (formProduct: Omit<Product, 'id'>) => {
    try {
      const newProduct = await createNewProduct(formProduct);
      setProducts((prevProducts) => {
        const updatedProducts = [...prevProducts, newProduct];
        setFilteredProducts(filterProducts(updatedProducts, filters));
        return updatedProducts;
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(`Error while creating product: ${error.response?.data.message}`);
      } else {
        setErrorMessage('An unknown error occurred.');
      }
    }
  };

  // Handle product update
  const handleSaveProduct = async (formProduct: Product) => {
    try {
      const modifiedProduct = await saveProduct(formProduct);
      setProducts((prevProducts) => {
        const updatedProducts = prevProducts.map((product) =>
          product.id === modifiedProduct.id ? modifiedProduct : product
        );
        setFilteredProducts(filterProducts(updatedProducts, filters));
        return updatedProducts;
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(`Error while updating product: ${error.response?.data.error}`);
      } else {
        setErrorMessage('An unknown error occurred.');
      }
    }
  };

  // Handle product deletion
  const handleDeleteProduct = async (productId: number) => {
    try {
      await deleteProduct(productId);
      setProducts((prevProducts) => {
        const updatedProducts = prevProducts.filter((product) => product.id !== productId);
        setFilteredProducts(filterProducts(updatedProducts, filters));
        return updatedProducts;
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(`Error while deleting product: ${error.response?.data.message}`);
      } else {
        setErrorMessage('An unknown error occurred.');
      }
    }
  };

     // Hanlde filters: Filter products according to selected filters
    const handleFilterProducts = (newFilters: Filters) => {
        setFilters(newFilters);
        setFilteredProducts( filterProducts(products, newFilters));
    };

  return (
    <ProductsContext.Provider
      value={{
        products,
        size: products.length,
        filteredProducts,
        filters,
        errorMessage,
        setFilters,
        handleCreateProduct,
        handleSaveProduct,
        handleDeleteProduct,
        handleFilterProducts
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProductsContext must be used within a ProductsProvider');
  }
  return context;
};