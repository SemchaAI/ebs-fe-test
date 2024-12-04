import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

import { Container, MainBtn } from '@/components/shared';
import { CategoriesBar, Pagination, ProductList } from '@/components/features';

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

  const [paginatedProducts, setPaginatedProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const paginated = products.slice(startIndex, startIndex + pageSize);
    setPaginatedProducts(paginated);
  }, [products, currentPage, pageSize]);

  return (
    <section className={css.productsSection}>
      <Container>
        <h3 className={css.productsSectionTitle}>Our products</h3>
        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
            alignItems: 'center',
          }}
        >
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
        <ProductList
          loading={loading}
          pageSize={pageSize}
          products={paginatedProducts}
        />
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
