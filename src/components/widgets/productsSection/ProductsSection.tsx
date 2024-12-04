import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';

import { Container, MainBtn } from '@/components/shared';
import { CategoriesBar, Pagination, ProductList } from '@/components/features';
import { ProductCard, ProductCardSkeleton } from '@/components/entities';

import { useProductContext } from '@/contexts';

import type { IProduct } from '@/models/product';

import css from './productsSection.module.scss';

export const ProductsSection = () => {
  const {
    currentPage,
    setPage,
    products,
    pageSize,
    loading,
    sortOrder,
    toggleSort,
  } = useProductContext();

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return products.slice(startIndex, startIndex + pageSize);
  }, [products, currentPage, pageSize]);

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
