import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, InputLabel, FormControl, MenuItem, Select} from '@mui/material';
import { Product } from '../types/Product';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useCategories } from '../hooks/useCategories';
import { useProductsContext } from '../context/ProductsContext';

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalForm: React.FC<ModalFormProps> = ({ isOpen, onClose }) => {
  const { handleCreateProduct } = useProductsContext();
  const { categories, error } = useCategories(); // Fetch categories using custom hook
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    idCategory: 0,
    name: '',
    unitPrice: 0,
    stock: 0,
    expirationDate: undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (newDate: any) => {
    setFormData({ ...formData, expirationDate: newDate });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCreateProduct(formData);
    setFormData({ idCategory: 1, name: '', unitPrice: 1, stock: 0, expirationDate: undefined });
    onClose();
  };

  // Render the edit/create form
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle>Create new product</DialogTitle>
        <form onSubmit={handleSubmit} className='new-product-form'>
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
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
              {error && <p style={{ color: 'red' }}>Failed to load categories</p>}
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
            <TextField
              fullWidth
              label="Unit Price"
              name="unitPrice"
              type="number"
              value={formData.unitPrice}
              onChange={(e) => setFormData({ ...formData, unitPrice: parseFloat(e.target.value) || 0 })}
              required
              sx={{ marginTop: 2 }}
            />

            {/* Stock */}
            <TextField
              fullWidth
              label="Stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
              required
              sx={{ marginTop: 2 }}
            />

            {/* Expiration Date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Expiration date"
                value={formData.expirationDate || null}
                onChange={handleDateChange}
              />
            </LocalizationProvider>

            {/* Submit Button */}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginBottom: 1 }}>
              Create product
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

export default ModalForm;