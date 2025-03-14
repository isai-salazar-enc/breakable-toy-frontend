import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, Button, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Product } from '../types/Product';
import { fetchCategories } from '../services/categoryService';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Category } from '../types/Category';
import dayjs from 'dayjs';

interface EditProductDialogProps {
    isOpen: boolean;
    product: Product;
    onClose: () => void;
    onSave: (updatedProduct: Product) => void;
}

const EditProductDialog: React.FC<EditProductDialogProps> = ({ isOpen, product, onClose, onSave }) => {
    const [categoryList, setCategoryList] = useState<Category[]>([]);  
    const [formData, setFormData] = useState<Product>({
        id: 0,
        idCategory: 0,
        name: '',
        unitPrice: 0,
        stock: 0,
        expirationDate: undefined,
      });

    // Fetch catgeories from API
    useEffect(() => {
        const loadCategories = async () => {
        try {
            const data = await fetchCategories();
            setCategoryList(data);
        } catch (error) {
            console.error('Error fetching categoriess.');
        }};

        loadCategories();
    }, []);

    useEffect(() => {
        if (product) {
          setFormData({ id: product.id, idCategory: product.idCategory, name: product.name, unitPrice: product.unitPrice, stock: product.stock, expirationDate: product.expirationDate});
        }
      }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (newDate: any) => {
        setFormData({ ...formData, expirationDate: newDate });
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        setFormData({ id:0, idCategory: 0, name: '', unitPrice: 0, stock: 0, expirationDate: undefined });
        onClose();
    };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle>Save product</DialogTitle>
        <form onSubmit={handleSave} className='new-product-form'>
            {/* Category */}
            <FormControl sx={{ textAlign: 'start', width: '100%' }}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                label="Category"
                value={formData.idCategory || ''}
                onChange={(e) => setFormData({ ...formData, idCategory: e.target.value as number })}
                required
              >
                {categoryList.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>


            {/* Name */}
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            {/* Unit Price */}
            <label htmlFor="unit">Unitary price</label>
            <input id="unit" className='input-number' type="number" name="unit" value={formData.unitPrice} min="0"
              onChange={(e) => setFormData({ ...formData, unitPrice: parseFloat(e.target.value) || 0 })}
              onFocus={(e) => (e.target.style.borderColor = '#1976d2')} // Border color when focused (MUI blue)
              onBlur={(e) => (e.target.style.borderColor = '#ccc')} // Reset border color when blurred
              step={0.01}
              required
            />

            {/* Stock */}
            <label htmlFor="stock">Stock</label>
            <input id="stock" className='input-number' type="number" name="stock" value={formData.stock} min="0"
              onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
              onFocus={(e) => (e.target.style.borderColor = '#1976d2')} // Border color when focused (MUI blue)
              onBlur={(e) => (e.target.style.borderColor = '#ccc')} // Reset border color when blurred
              required
            />

            {/* Expiration Date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Expiration date"
                value={formData.expirationDate ? dayjs(formData.expirationDate) : null}
                onChange={handleDateChange}
              />
            </LocalizationProvider>

            {/* Submit Button */}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginBottom: 1 }}>
              Save product
            </Button>

            {/* Close Button */}
            <Button type="button" variant="outlined" onClick={onClose} fullWidth>
              Cancel
            </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;
