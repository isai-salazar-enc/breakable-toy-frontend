import './App.css'
import { useState, useEffect } from 'react';
import { fetchProductsWithCategory, createNewProduct, saveProduct } from './services/productService';
import { ProductWithCategoryDTO } from './types/ProductWithCategoryDTO';
import ProductTable from './components/ProductTable'
import Filter from './components/Filter';
import axios from 'axios';
import FormDialog from './components/FormDialog';
import { Product } from './types/Product';
import { Alert, Button } from '@mui/material';
import MetricsTable from './components/MetricsTable';
import EditProductDialog from './components/EditProductDialog';


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
  const [openEdit, setOpenEdit] = useState(false);
  const [editProduct, setEditProduct] = useState<Product>({id:0, idCategory:0, name:'', unitPrice:0, stock:0, expirationDate: undefined});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
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

  // Handle product update
  const handleSaveProduct = async (formProduct:Product) =>{
    try {
      const modifiedProduct = await saveProduct(formProduct);

      setProducts((prevProducts) => {
        // Replace the modified product in the previous array
        const updatedProducts = prevProducts.map((product) =>
          product.id === modifiedProduct.id ? modifiedProduct : product
        );

        // Apply filters on updated array
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
        setErrorMessage(`Error while updating product: ${error.response?.data.error}`);
      } else {
        setErrorMessage('An unknown error ocurred.');
      }
    }
  }

  const handleEditClickOpen = (product: Product) => {
    setEditProduct(product);
    setOpenEdit(true);
  };

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
      <ProductTable rows={filteredProducts} onClickEditOpen={handleEditClickOpen}/>
      <FormDialog isOpen={open} onClose={handleClose} onSubmit={handleCreateProduct}></FormDialog>
      <EditProductDialog isOpen={openEdit} onClose={handleCloseEdit} onSave={handleSaveProduct} product={editProduct} />
      <MetricsTable productsSize={products.length}/>
    </>
  )
}

export default App
