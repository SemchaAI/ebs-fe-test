import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

import type { IProduct } from '@/models/product';
import css from './productCard.module.scss';
interface IProps {
  product: IProduct;
}

export const ProductCard = ({
  product: { id, image, title, description, price, rating },
}: IProps) => {
  return (
    <li className={css.productCard}>
      <Link
        className={css.productCardLink}
        to={`/product/${id}`}
      >
        <img
          className={css.productCardImage}
          src={image}
          alt={title}
        />
        <h3 className={css.productCardTitle}>{title}</h3>
      </Link>
      <p className={css.productCardDescription}>{description}</p>
      <p>{price}$</p>
      <div className={css.productCardRating}>
        {rating.rate}
        <Star
          className={css.productCardStar}
          size={24}
        />
      </div>
    </li>
  );
};
