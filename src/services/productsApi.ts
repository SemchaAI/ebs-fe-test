import { IProduct } from '@/models/product';
import { ApiRoutes } from './api/routes';

export const getProducts = async (): Promise<IProduct[]> => {
  const response = await fetch(`${ApiRoutes.PRODUCTS}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data: IProduct[] = await response.json();
  return data;
};
export const getCategoryProducts = async (
  category: string
): Promise<IProduct[]> => {
  const response = await fetch(`${ApiRoutes.CATEGORY_PRODUCTS}/${category}`);
  if (!response.ok) {
    throw new Error('Failed to fetch category products');
  }
  const data: IProduct[] = await response.json();
  return data;
};
