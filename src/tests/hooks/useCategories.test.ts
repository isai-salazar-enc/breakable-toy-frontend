import { renderHook, waitFor } from '@testing-library/react';
import { useCategories } from '../../hooks/useCategories';
import { fetchCategories } from '../../services/categoryService';
import { describe, it, expect, vi, Mock } from 'vitest';

// Mock the fetchCategories service function to control its response
vi.mock('../../services/categoryService', () => ({
    fetchCategories: vi.fn(),
}));

// Test suite for the useCategories hook
describe('useCategories hook', () => {

    // Test case for the initial state
    it('Should start in loading and with no errors', async () => {
      (fetchCategories as Mock).mockResolvedValue([]); // Simulate a successful fetch with an empty list of categories
      const { result } = renderHook(() => useCategories()); // Render the hook for testing
  
      // Assert the hook’s initial state: loading is true, error is null, and categories is an empty array
      expect(result.current.loading).toBe(true);
      expect(result.current.error).toBe(null);
      expect(result.current.categories).toEqual([]);
  
      // Wait for the state to update after fetch completion and assert the final state
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(null);
        expect(result.current.categories).toEqual([]);
      });
    });

    // Test case for an unsuccessful fetch
    it('Should handle an error when fetching categories', async () => {
        (fetchCategories as Mock).mockRejectedValue(new Error('Failed to fetch categories')); // Simulate a failed fetch in the service
        const { result } = renderHook(() => useCategories()); // Render the hook for testing

        // Wait for the state to update after fetch completion and assert the final state
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(result.current.error).toBe('Error while fetching categories');
            expect(result.current.categories).toEqual([]);
        });
    });

    // Test case for a successful fetch
    it('Should fetch categories successfully', async () => {
        (fetchCategories as Mock).mockResolvedValue([{ id: 1, name: 'Category 1' }]); // Simulate a successful fetch with a list of categories
        const { result } = renderHook(() => useCategories()); // Render the hook for testing

        // Wait for the state to update after fetch completion and assert the final state
        await waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(result.current.error).toBe(null);
            expect(result.current.categories).toEqual([{ id: 1, name: 'Category 1' }]);
        });
    });

});