import './App.css'
import { useState, useEffect } from 'react';
import { fetchProductsWithCategory } from './services/productService';
import { ProductWithCategoryDTO } from './types/ProductWithCategoryDTO';
import ProductTable from './components/ProductTable'
import Filter from './components/Filter';


interface Filters {
  searchName: string;
  category: string;
  availability: boolean | null;
}

function App() {
  const [products, setProducts] = useState<ProductWithCategoryDTO[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductWithCategoryDTO[]>(products);
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
        console.error('Error fetching products:', error);
      }
    };

    loadProducts();
  }, []);

  // Hanlde filters: Filter products according to selected filters
  const handleFilter = (newFilters: Filters) => {
    setFilters(newFilters);
    const filtered = products.filter((product) => {
      const matchesName = product.name.toLowerCase().includes(newFilters.searchName.toLowerCase());
      const matchesCategory = newFilters.category ? product.category === newFilters.category : true; // If empty, pass filter
      const matchesAvailability = newFilters.availability !== null ? product.stock > 0 : true; // If empty, pass filter
      return matchesName && matchesCategory && matchesAvailability;
    });
    setFilteredProducts(filtered);
  };

  return (
    <>
      <Filter onFilter={handleFilter}/>
      <button type="button">New product</button>
      <ProductTable rows={filteredProducts} />

      {/* TO-DO: Add inventory metrics */}
    </>
  )
}

export default App
