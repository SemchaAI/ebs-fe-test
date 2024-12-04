import { ProductCard, ProductCardSkeleton } from '@/components/entities';

import type { IProduct } from '@/models/product';
import css from './productList.module.scss';

interface IProps {
  products: IProduct[];
  loading: boolean;
  pageSize: number;
}

export const ProductList = ({ products, loading, pageSize }: IProps) => {
  if (loading) {
    return (
      <div className={css.productListContainer}>
        {loading && (
          <ul className={css.productList}>
            {[...Array(pageSize)].map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className={css.productListContainer}>
      <ul className={css.productList}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </ul>
    </div>
  );
};
