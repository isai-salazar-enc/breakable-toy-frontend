import { Product } from "../types/Product"
import { ProductWithCategoryDTO } from "../types/ProductWithCategoryDTO";
import axios from 'axios';

// Create a new axios instance
const api = axios.create({
  baseURL: 'http://127.0.0.1:8080/api/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch("http://127.0.0.1:8080/api/products");
  if (!response.ok) {
    throw new Error('Error while retrieving products.');
  }
  return response.json();
};

export const fetchProductsWithCategory = async (): Promise<ProductWithCategoryDTO[]> => {
  const response = await fetch("http://127.0.0.1:8080/api/products");
  if (!response.ok) {
    throw new Error('Error while retrieving products.');
  }
  return response.json();
};

export const createNewProduct = async (newProduct:Omit<Product, 'id'>): Promise<ProductWithCategoryDTO> =>{ 
  const response = await api.post<ProductWithCategoryDTO>('/products', newProduct);
  return response.data;
}