import { Product } from "../types/Product"
import { ProductWithCategoryDTO } from "../types/ProductWithCategoryDTO";

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