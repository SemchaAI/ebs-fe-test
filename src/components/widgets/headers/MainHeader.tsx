import { Link } from 'react-router-dom';
import { ShoppingCart, Squirrel } from 'lucide-react';
import { Container } from '@/components/shared';
import css from './mainHeader.module.scss';

export const MainHeader = () => {
  return (
    <header className={css.header}>
      <Container>
        <div className={css.headerContainer}>
          <Link
            className={css.logoLink}
            to="/"
            title="Squirrel shop main page"
          >
            <Squirrel
              width={45}
              height={45}
              className={css.logoIcon}
            />
            <div className={css.logoTextBlock}>
              <h1 className={css.logoTitle}>
                <span>Squirrel</span>Shop
              </h1>
              <p className={css.logoText}>
                <span>Fastest</span> <span>delivery</span>
              </p>
            </div>
          </Link>
          <Link
            to={'/cart'}
            title="Squirrel shop cart"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ShoppingCart />
          </Link>
        </div>
      </Container>
    </header>
  );
};
