import { useEffect, useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';

import { Container, MainBtn } from '@/components/shared';
import { CategoriesBar, Pagination, ProductList } from '@/components/features';
import { ProductCard, ProductCardSkeleton } from '@/components/entities';

import { useProductContext, useToastContext } from '@/contexts';
import { getSmartProducts } from '@/services';

import type { IProduct } from '@/models/product';

import css from './productsSection.module.scss';

export const ProductsSection = () => {
  const {
    currentPage,
    setPage,
    products,
    pageSize,

    sortOrder,
    toggleSort,
    currentCategory,
    setProducts,
  } = useProductContext();
  const { addToast } = useToastContext();

  const [loading, setLoading] = useState(false);
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const newProducts = await getSmartProducts(currentCategory);
      // Sort products
      const sortedProducts = newProducts.sort((a, b) =>
        sortOrder === 'asc' ? a.price - b.price : b.price - a.price
      );
      setProducts(sortedProducts);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      addToast('Failed to fetch products', 'error', 5000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentCategory]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return products.slice(startIndex, startIndex + pageSize);
  }, [products, currentPage, pageSize, sortOrder]);

  return (
    <section className={css.productsSection}>
      <Container>
        <h3 className={css.productsSectionTitle}>Our products</h3>
        <div className={css.productListHeader}>
          <CategoriesBar />
          <MainBtn
            icon
            version="contain"
            label="Sort by price"
            onClick={toggleSort}
          >
            Price
            <ChevronDown
              className={`${css.icon} ${sortOrder === 'asc' ? css.rotate : ''}`}
            />
          </MainBtn>
        </div>
        <div className={css.productListContainer}>
          <ProductList
            loading={loading}
            pageSize={pageSize}
            items={paginatedProducts}
            skeleton={<ProductCardSkeleton />}
            renderItem={(product: IProduct) => (
              <ProductCard product={product} />
            )}
          />
        </div>
        <Pagination
          totalProducts={products.length}
          currentPage={currentPage}
          setPage={setPage}
          pageSize={pageSize}
        />
      </Container>
    </section>
  );
};
