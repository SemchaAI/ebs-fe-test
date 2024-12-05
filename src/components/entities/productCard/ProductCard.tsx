import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, Star, Trash2 } from 'lucide-react';

import { MainBtn } from '@/components/shared';
import { useCartContext } from '@/contexts';

import type { IProduct } from '@/models/product';
import css from './productCard.module.scss';

interface IProps {
  product: IProduct;
  inCart?: boolean;
  onRemoveFromCart?: (productId: number) => void;
  onQuantityChange?: (productId: number, quantity: number) => void;

  quantity?: number;
}

export const ProductCard = ({
  product,
  inCart = false,
  quantity = 1,
}: //: { id, image, title, description, price, rating },
IProps) => {
  const { id, image, title, description, price, rating } = product;
  const { addItem, removeItem, updateQuantity } = useCartContext();

  const handleAddToCart = () => {
    addItem(product);
  };

  const handleRemoveFromCart = () => {
    removeItem(id);
  };

  const handleIncreaseQuantity = () => {
    updateQuantity(id, quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    }
  };

  return (
    <li className={css.productCard}>
      <Link
        className={css.productCardLink}
        // to={`/product/${id}`}
        to="#" //ROUTES.PRODUCT
      >
        <img
          className={css.productCardImage}
          src={image}
          alt={title}
        />
        <h3 className={css.productCardTitle}>{title}</h3>
      </Link>
      <p className={css.productCardDescription}>{description}</p>
      <div className={css.productCardLine}>
        <p>{price}$</p>
        {!inCart ? (
          <MainBtn
            className={css.productCardBtn}
            icon
            type="button"
            version="outline"
            label="Add to cart"
            onClick={handleAddToCart}
          >
            <span className={css.productCardBtnText}>Add to cart</span>
            <ShoppingCart className={css.productCardBtnIcon} />
          </MainBtn>
        ) : (
          <div className={css.cartControls}>
            <div className={css.quantityControls}>
              <MainBtn
                icon
                version="outline"
                label="Decrease quantity"
                onClick={handleDecreaseQuantity}
                disabled={quantity <= 1}
              >
                <Minus />
              </MainBtn>
              <span className={css.quantity}>{quantity}</span>
              <MainBtn
                icon
                version="outline"
                label="Increase quantity"
                onClick={handleIncreaseQuantity}
              >
                <Plus />
              </MainBtn>
            </div>
            <MainBtn
              icon
              version="outline"
              label="Remove from cart"
              onClick={handleRemoveFromCart}
            >
              <Trash2 />
            </MainBtn>
          </div>
        )}
      </div>

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
