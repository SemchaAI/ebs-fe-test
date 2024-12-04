import { ApiRoutes } from './api/routes';

export const getCategories = async (): Promise<string[]> => {
  const response = await fetch(`${ApiRoutes.CATEGORIES}`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  const data: string[] = await response.json();
  return data;
};
