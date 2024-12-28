export interface ProductWithCategoryDTO {
    id: number;
    idCategory: number;
    name: string;
    category: string;
    unitPrice: number;
    stock: number;
    expirationDate?: Date;
  }