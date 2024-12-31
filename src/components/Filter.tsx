import TextField from '@mui/material/TextField';
import { useEffect } from 'react';
import React, { useState } from 'react';
import { fetchCategories } from '../services/categoryService';
import { Category } from '../types/Category';

interface FilterProps {
  onFilter: (filters: { searchName: string; category: string; availability: boolean | null }) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const [searchName, setSearchName] = useState('');
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [category, setCategory] = useState('');
  const [availability, setAvailability] = useState<boolean | null>(null);

  const handleFilter = () => {
    onFilter({ searchName, category, availability });
  };

  // Fetch catgeories from API
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategoryList(data);
      } catch (error) {
        console.error('Error fetching categoriess.');
      }
    };

    loadCategories();
  }, []);

  return (
    <div className='filter-container'>
        <TextField id="input-name" label="Name" variant="standard" placeholder="Search by name" defaultValue={searchName} onChange={(e) => setSearchName(e.target.value)}/>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categoryList.map((cat) => (
            <option key={cat.id} value={cat.name}>
                {cat.name}
            </option>
            ))}
        </select>
        <select value={availability?.toString() || ''} onChange={(e) => setAvailability(e.target.value === 'true' ? true : e.target.value === 'false' ? false : null)}>
            <option value="">All</option>
            <option value="true">Available</option>
            <option value="false">Unavailable</option>
        </select>
        <button onClick={handleFilter}>Filter</button>
    </div>
  );
};

export default Filter;
