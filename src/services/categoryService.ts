import { Category } from "../types/Category";

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch("http://127.0.0.1:8080/api/categories");
  if (!response.ok) {
    throw new Error('Error while retrieving categories.');
  }
  return response.json();
};