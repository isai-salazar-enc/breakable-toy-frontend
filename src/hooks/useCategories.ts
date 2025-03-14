import { useEffect, useState } from "react";
import { fetchCategories } from "../services/categoryService";
import { Category } from "../types/Category";

// Desc: Custom hook to fetch categories from the API and handle loading and error states
export const useCategories = () => {   
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (err) {
                setError('Error while fetching categories');
            } finally {
                setLoading(false);
            }
        };
        
        loadCategories();
    }, []);
    
    return { categories, loading, error };
}