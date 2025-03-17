import './App.css'
import { useState } from 'react';
import { Product } from './types/Product';
import ProductTable from './components/ProductTable'
import Filter from './components/Filter';
import FormDialog from './components/FormDialog';
import { Button } from '@mui/material';
import MetricsTable from './components/MetricsTable';
import EditProductDialog from './components/EditProductDialog';

function App() {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editProduct, setEditProduct] = useState<Product>({id:0, idCategory:0, name:'', unitPrice:0, stock:0, expirationDate: undefined});

  
  const handleClickOpen = () => { setOpen(true);}; // Open the dialog to create a new product
  const handleClose = () => { setOpen(false); };  // Close the dialog to create a new product
  const handleCloseEdit = () => { setOpenEdit(false);}; // Close the dialog to edit a product

  // Open the dialog to edit a product
  const handleEditClickOpen = (product: Product) => {
    setEditProduct(product);
    setOpenEdit(true);
  };

  return (
    <>
      <Filter/>
      <div id='button-wrapper'>
        <Button type="button" variant='contained' onClick={handleClickOpen} id='button-create' sx={{marginY: 2}}>New product</Button>
      </div>
      <ProductTable onClickEditOpen={handleEditClickOpen}/>
      <FormDialog isOpen={open} onClose={handleClose}></FormDialog>
      <EditProductDialog isOpen={openEdit} onClose={handleCloseEdit} product={editProduct} />
      <MetricsTable/>
    </>
  )
}

export default App
