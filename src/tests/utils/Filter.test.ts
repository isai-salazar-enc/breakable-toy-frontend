import { filterProducts } from '../../utils/filtering';
import { ProductWithCategoryDTO } from '../../types/ProductWithCategoryDTO';
import { describe, expect, it } from 'vitest';

// Test suite for the `filterProducts` function
describe('filterProducts', () => {
  /**
   * A mock array of products used for testing purposes.
   * Each product is represented as an object conforming to the `ProductWithCategoryDTO` interface.
   */
  const mockProducts: ProductWithCategoryDTO[] = [
    { id: 1, idCategory: 1, name: 'Product A', category: 'Category 1', unitPrice: 10, stock: 5, expirationDate: new Date() },
    { id: 2, idCategory: 2, name: 'Product B', category: 'Category 2', unitPrice: 20, stock: 0, expirationDate: new Date() },
    { id: 3, idCategory: 1, name: 'Product C', category: 'Category 1', unitPrice: 30, stock: 10, expirationDate: new Date() },
    { id: 4, idCategory: 2, name: 'Product D', category: 'Category 2', unitPrice: 40, stock: 0, expirationDate: new Date() },
    { id: 5, idCategory: 1, name: 'Product AB', category: 'Category 1', unitPrice: 50, stock: 15, expirationDate: new Date() },
  ];

  // Test filter by name
  it('should filter by name', () => {
    const filters = { searchName: 'Product A', category: '', availability: null };
    const result = filterProducts(mockProducts, filters);
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Product A');
  });

  // Test filter by category
  it('should filter by category', () => {
    const filters = { searchName: '', category: 'Category 1', availability: null };
    const result = filterProducts(mockProducts, filters);
    expect(result).toHaveLength(3);
    expect(result[0].category).toBe('Category 1');
    expect(result[1].category).toBe('Category 1');
    expect(result[2].category).toBe('Category 1');
  });
  
  // Test no match for category
  it('should return an empty array if no match for category', () => { 
    const filters = { searchName: '', category: 'Category 3', availability: null };
    const result = filterProducts(mockProducts, filters);
    expect(result).toHaveLength(0);
  });

  // Test filter by name and category
  it('should filter by name and category', () => {
    const filters = { searchName: 'Product A', category: 'Category 1', availability: null };
    const result = filterProducts(mockProducts, filters);
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Product A');
    expect(result[0].category).toBe('Category 1');
  });

  // Test filter by availability
  it('should filter by availability', () => {
    const filters = { searchName: '', category: '', availability: true };
    const result = filterProducts(mockProducts, filters);
    expect(result).toHaveLength(3);
    expect(result[0].stock).toBeGreaterThan(0);
    expect(result[1].stock).toBeGreaterThan(0);
    expect(result[2].stock).toBeGreaterThan(0);
  });

  // Test filter by no availability
  it('should filter by no availability', () => {
    const filters = { searchName: '', category: '', availability: false };
    const result = filterProducts(mockProducts, filters);
    expect(result).toHaveLength(2);
    expect(result[0].stock).toBe(0);
    expect(result[1].stock).toBe(0);
  });

  // Test no filter, no category, no availability
  it('should return the original array if no filter is applied', () => {
    const filters = { searchName: '', category: '', availability: null };
    const result = filterProducts(mockProducts, filters);
    expect(result).toHaveLength(5);
  });

});