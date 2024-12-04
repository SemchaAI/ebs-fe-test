import { createContext, useState, type ReactNode, useEffect } from 'react';
import type { IProduct } from '@/models/product';
import { getCategoryProducts, getProducts } from '@/services';

type TSortOrder = 'desc' | 'asc';

interface ProductsContextValue {
  products: IProduct[];
  currentPage: number;
  pageSize: number;
  currentCategory: string;
  sortOrder: TSortOrder;
  loading: boolean;
  setPage: (page: number) => void;
  setCategory: (category: string) => void;
  toggleSort: () => void;
}

const ProductsContext = createContext<ProductsContextValue | undefined>(
  undefined
);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  const [currentCategory, setCurrentCategory] = useState('');
  const [sortOrder, setSortOrder] = useState<TSortOrder>('asc');
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const newProducts =
        currentCategory === ''
          ? await getProducts()
          : await getCategoryProducts(currentCategory);

      // Sort products
      const sortedProducts = [...newProducts].sort((a, b) =>
        sortOrder === 'asc' ? a.price - b.price : b.price - a.price
      );

      setProducts(sortedProducts);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [currentCategory]);

  const toggleSort = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    setProducts((prev) =>
      [...prev].sort((a, b) =>
        newSortOrder === 'asc' ? a.price - b.price : b.price - a.price
      )
    );
  };

  const setCategory = (category: string) => {
    setCurrentCategory(category);
    setCurrentPage(1);
  };

  const setPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        currentPage,
        pageSize,
        currentCategory,
        sortOrder,
        loading,
        setPage,
        setCategory,
        toggleSort,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
