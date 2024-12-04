import { memo, useEffect, useState } from 'react';
import { Skeleton } from '@/components/shared';

import { getCategories } from '@/services/categoriesApi';

import { useProductContext, useToastContext } from '@/contexts';

import css from './categoriesBar.module.scss';

export const CategoriesBar = memo(() => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { setCategory, currentCategory } = useProductContext();
  const { addToast } = useToastContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.log('Failed to fetch categories:', error);
        addToast('Failed to fetch categories', 'error', 5000);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className={css.bar}>
        {[...Array(4)].map((_, index) => (
          <Skeleton
            width="100px"
            height="36px"
            borderRadius="15px"
            key={index}
          />
        ))}
      </div>
    );

  return (
    <div className={css.bar}>
      <button
        className={`${css.barItem} ${currentCategory === '' ? css.active : ''}`}
        onClick={() => setCategory('')}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          className={`${css.barItem} ${
            currentCategory === category ? css.active : ''
          }`}
          key={category}
          onClick={() => setCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
});
