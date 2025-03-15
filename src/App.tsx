import './App.css'
import { useState, useEffect } from 'react';
import { fetchProductsWithCategory, createNewProduct, saveProduct, deleteProduct } from './services/productService';
import { ProductWithCategoryDTO } from './types/ProductWithCategoryDTO';
import ProductTable from './components/ProductTable'
import Filter from './components/Filter';
import axios from 'axios';
import FormDialog from './components/FormDialog';
import { Product } from './types/Product';
import { Alert, Button } from '@mui/material';
import MetricsTable from './components/MetricsTable';
import EditProductDialog from './components/EditProductDialog';
import { filterProducts } from './utils/filtering';


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
    setFilteredProducts( filterProducts(products, newFilters));
  };

  // Handle product creation
  const handleCreateProduct = async (formProduct:Omit<Product,'id'>) =>{
    try {
      const newProduct = await createNewProduct(formProduct);
      setProducts((prevProducts) => {
        const updatedProducts = [...prevProducts, newProduct];
        setFilteredProducts( filterProducts(updatedProducts, filters));
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

        setFilteredProducts( filterProducts(updatedProducts, filters) ); 
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
      <ProductTable rows={filteredProducts} onClickEditOpen={handleEditClickOpen} onClickDelete={handleDeleteProduct}/>
      <FormDialog isOpen={open} onClose={handleClose} onSubmit={handleCreateProduct}></FormDialog>
      <EditProductDialog isOpen={openEdit} onClose={handleCloseEdit} onSave={handleSaveProduct} product={editProduct} />
      <MetricsTable productsSize={products.length}/>
    </>
  )
}

export default App
