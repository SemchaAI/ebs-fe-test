import {
  createContext,
  useState,
  type ReactNode,
  // useEffect,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import type { IProduct } from '@/models/product';
import { getCategoryProducts, getProducts } from '@/services';
import { useToastContext } from '@/contexts';

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
  setProducts: (products: IProduct[]) => void;
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

  const { addToast } = useToastContext();

  const fetchProducts = useCallback(async () => {
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
      addToast('Failed to fetch products', 'error', 5000);
    } finally {
      setLoading(false);
    }
  }, [currentCategory]);

  useEffect(() => {
    fetchProducts();
  }, [currentCategory]);

  const toggleSort = useCallback(() => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    setProducts((prev) =>
      [...prev].sort((a, b) =>
        newSortOrder === 'asc' ? a.price - b.price : b.price - a.price
      )
    );
  }, [sortOrder]);

  const setCategory = useCallback((category: string) => {
    setCurrentCategory(category);
    setCurrentPage(1);
  }, []);

  const setPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

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
        setProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
