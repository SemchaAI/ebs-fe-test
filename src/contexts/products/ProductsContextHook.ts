import { useContext } from 'react';
import ProductsContext from './ProductsProvider';

export const useProductContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error(
      'useProductContext must be used within a ProductsContextProvider'
    );
  }
  return context;
};
