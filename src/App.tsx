import './App.css'
import { useState, useEffect } from 'react';
import { fetchProductsWithCategory, createNewProduct } from './services/productService';
import { ProductWithCategoryDTO } from './types/ProductWithCategoryDTO';
import ProductTable from './components/ProductTable'
import Filter from './components/Filter';
import axios from 'axios';
import FormDialog from './components/FormDialog';
import { Product } from './types/Product';
import { Alert, Button } from '@mui/material';
import MetricsTable from './components/MetricsTable';


interface Filters {
  searchName: string;
  category: string;
  availability: boolean | null;
}

function App() {
  const [products, setProducts] = useState<ProductWithCategoryDTO[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductWithCategoryDTO[]>(products);
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [filters, setFilters] = useState<Filters>({
    searchName: '',
    category: '',
    availability: null,
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

    loadProducts();1
  }, []);

  // Hanlde filters: Filter products according to selected filters
  const handleFilter = (newFilters: Filters) => {
    setFilters(newFilters);
    const filtered = products.filter((product) => {
      const matchesName = product.name.toLowerCase().includes(newFilters.searchName.toLowerCase());
      const matchesCategory = newFilters.category ? product.category === newFilters.category : true; // If empty, pass filter
      const matchesAvailability = newFilters.availability !== null ? product.stock > 0 === newFilters.availability: true; // If empty, pass filter
      return matchesName && matchesCategory && matchesAvailability;
    });
    setFilteredProducts(filtered);
  };

  // Handle product creation
  const handleCreateProduct = async (formProduct:Omit<Product,'id'>) =>{
    try {
      const newProduct = await createNewProduct(formProduct);
      setProducts((prevProducts) => {
        const updatedProducts = [...prevProducts, newProduct];
        
        // Apply filters on new array, because set is async
        const filtered = updatedProducts.filter((product) => {
          const matchesName = product.name.toLowerCase().includes(filters.searchName.toLowerCase());
          const matchesCategory = filters.category ? product.category === filters.category : true;
          const matchesAvailability = filters.availability !== null ? product.stock > 0 === filters.availability : true;
          return matchesName && matchesCategory && matchesAvailability;
        });
      
        setFilteredProducts(filtered);
        return updatedProducts;
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(`Error while creating product: ${error.response?.data.message}`);
      } else {
        setErrorMessage('An unknown error ocurred.');
      }
    }
  }
  return (
    <>
      {errorMessage && (
          <Alert severity="error" sx={{ marginBottom: 1 }} onClose={() => setErrorMessage(null)}>
            {errorMessage}
          </Alert>
        )}
      <Filter onFilter={handleFilter}/>
      <div id='button-wrapper'>
        <Button type="button" variant='contained' onClick={handleClickOpen} id='button-create' sx={{marginY: 2}}>New product</Button>
      </div>
      <ProductTable rows={filteredProducts} />
      <FormDialog isOpen={open} onClose={handleClose} onSubmit={handleCreateProduct}></FormDialog>
      <MetricsTable productsSize={products.length}/>
    </>
  )
}

export default App
