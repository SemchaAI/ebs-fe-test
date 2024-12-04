import React from 'react';
import css from './productList.module.scss';

interface IProps<T> {
  items: T[];
  loading: boolean;
  pageSize: number;
  renderItem: (item: T) => React.ReactNode;
  skeleton: React.ReactNode;
}

export const ProductList = <T,>({
  items,
  loading,
  pageSize,
  renderItem,
  skeleton,
}: IProps<T>) => {
  if (loading) {
    return (
      <div className={css.productListContainer}>
        {loading && (
          <ul className={css.productList}>
            {[...Array(pageSize)].map((_, index) => (
              <React.Fragment key={index}>{skeleton}</React.Fragment>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <ul className={css.productList}>
      {items.map((item, index) => (
        <React.Fragment key={index}>{renderItem(item)}</React.Fragment>
      ))}
    </ul>
  );
};
