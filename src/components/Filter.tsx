import { TextField, FormControl, Select, MenuItem, InputLabel, Button } from '@mui/material';
import React, { useState } from 'react';
import { useCategories } from '../hooks/useCategories';
import { useProductsContext } from '../context/ProductsContext';

const Filter: React.FC = () => {
  const { handleFilterProducts } = useProductsContext();
  const [searchName, setSearchName] = useState('');
  const { categories } = useCategories(); // Fetch categories using custom hook
  const [category, setCategory] = useState('');
  const [availability, setAvailability] = useState<boolean | null>(null);

  const handleFilter = () => {
    handleFilterProducts({ searchName, category, availability });
  };

  const handleReset = () => {
    setSearchName('');
    setAvailability(null);
    setCategory('');
  }

  return (
    <div className='filter-container'>
        <TextField id="input-name" label="Name" variant="outlined" placeholder="Search by name" sx={{ marginTop: 2}} value={searchName} onChange={(e) => setSearchName(e.target.value)}/>

        <FormControl size="small" sx={{ minWidth: 120, textAlign: 'start' }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
                labelId="category-label"
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <MenuItem value="">All categories</MenuItem>
                {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.name}>
                        {cat.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
        
        <FormControl size="small" sx={{ minWidth: 120, textAlign: 'start' }}>
            <InputLabel id="availability-label">Availability</InputLabel>
            <Select
                label="Availability"
                labelId="category-label"
                value={availability?.toString() || ''}
                onChange={(e) => setAvailability(e.target.value === 'true' ? true : e.target.value === 'false' ? false : null)}
            >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="true">In stock</MenuItem>
                <MenuItem value="false">Out of stock</MenuItem>
        </Select>
        </FormControl>
        <div id='filter-buttons-wrapper'>
            <Button variant="outlined" onClick={handleReset} aria-label='Reset filters' sx={{ marginRight: 2}}>Reset</Button>
            <Button variant="outlined" onClick={handleFilter} aria-label='Apply filters'>Search</Button>
        </div>
    </div>
  );
};

export default Filter;
