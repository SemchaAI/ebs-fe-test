import { Link } from 'react-router-dom';
import { ArrowRight, Boxes, Trash2 } from 'lucide-react';

import { ProductList } from '@/components/features';
import { CardBlock, Container, MainBtn } from '@/components/shared';
import { ProductCard, ProductCardSkeleton } from '@/components/entities';

import { useCartContext } from '@/contexts';

import css from './cartSection.module.scss';

export const CartSection = () => {
  const { cart, clearCart, totalAmount } = useCartContext();
  return (
    <section className={css.cartSection}>
      <Container>
        <div className={css.cartSectionTitleContainer}>
          <h3 className={css.cartSectionTitle}>Cart section </h3>
          <MainBtn
            icon
            version="outline"
            label="clear cart"
            onClick={clearCart}
          >
            Clear all <Trash2 />
          </MainBtn>
        </div>
        <div className={css.cartSectionContainer}>
          {cart.length > 0 ? (
            <ProductList
              loading={false}
              pageSize={4}
              items={cart}
              renderItem={(product) => (
                <ProductCard
                  product={product}
                  inCart
                  quantity={product.quantity}
                />
              )}
              skeleton={<ProductCardSkeleton />}
            />
          ) : (
            <div className={css.cartEmpty}>
              Cart is empty{' '}
              <Boxes
                size={36}
                color="var(--primary-main)"
              />
            </div>
          )}

          <CardBlock
            className={css.stickyCart}
            fitContent
            title="Total cart:"
          >
            <div className={css.cartOrder}>
              <div className={css.cartTotal}>Items price: {totalAmount} $</div>
              <div className={css.cartDelivery}>
                Items positions: <span>{cart.length}</span>
              </div>
              <p className={css.cartPolicy}>
                <span className={css.asterisk}>*</span>By purchasing goods from
                us you agree to the privacy policy
              </p>
              <Link
                className={css.cartLink}
                to="#"
                title="to checkout page"
              >
                Purchase now <ArrowRight />
              </Link>
            </div>
          </CardBlock>
        </div>
      </Container>
    </section>
  );
};
