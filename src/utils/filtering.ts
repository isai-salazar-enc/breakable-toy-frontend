import { Filters } from "../types/Filters";
import { ProductWithCategoryDTO } from "../types/ProductWithCategoryDTO";


// Apply filters on a given array of products
export const filterProducts = (products : ProductWithCategoryDTO[], filters : Filters) : ProductWithCategoryDTO[] => {
 return products.filter((product) => {
    const matchesName = product.name.toLowerCase().includes(filters.searchName.toLowerCase());
    const matchesCategory = filters.category ? product.category === filters.category : true;
    const matchesAvailability = filters.availability !== null ? product.stock > 0 === filters.availability : true;
    return matchesName && matchesCategory && matchesAvailability;
  });
}