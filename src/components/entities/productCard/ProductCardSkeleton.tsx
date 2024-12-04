import { Skeleton } from '@/components/shared';
import css from './productCard.module.scss';

export const ProductCardSkeleton = () => {
  return (
    <li className={css.productCard}>
      <Skeleton
        width="100%"
        height="300px"
        borderRadius="10px"
      />
      <Skeleton
        width="90%"
        height="24px"
      />
      <Skeleton
        width="100%"
        height="80px"
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Skeleton
          width="20%"
          height="24px"
        />
        <Skeleton
          width="100px"
          height="24px"
          borderRadius="5px"
        />
      </div>
    </li>
  );
};
