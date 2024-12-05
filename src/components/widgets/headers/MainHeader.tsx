import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AlignJustify, Heart, ShoppingCart, Squirrel, X } from 'lucide-react';

import { Container, MainBtn } from '@/components/shared';
import { useCartContext } from '@/contexts';
import { useScrollControl } from '@/utils/hooks';
import { ROUTES } from '@/utils/configs/routesConfig';
import css from './mainHeader.module.scss';

export const MainHeader = () => {
  const { total } = useCartContext();

  //MOB MENU
  const [active, setActive] = useState(false);
  const location = useLocation();
  useScrollControl(active);
  useEffect(() => {
    setActive(false);
  }, [location.pathname]);
  //

  return (
    <header className={css.header}>
      {active && (
        <div
          onClick={() => setActive((prev) => !prev)}
          className={css.mobOverlay}
        ></div>
      )}
      <Container>
        <div className={css.headerContainer}>
          <Link
            className={css.logoLink}
            to={ROUTES.HOME}
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
          <nav
            className={`${css.headerNav} ${active ? css.headerNavActive : ''}`}
          >
            <MainBtn
              className={css.closeBtn}
              type="button"
              version="outline"
              icon
              onClick={() => setActive((prev) => !prev)}
            >
              <X
                className={css.closeIcon}
                width={23}
                height={23}
              />
            </MainBtn>
            <ul className={css.navList}>
              <li className={css.navItem}>
                <Link
                  className={css.navLink}
                  to={ROUTES.CONTACTS}
                  title="Squirrel shop contacts page"
                >
                  Contacts
                </Link>
              </li>
              <li className={css.navItem}>
                <Link
                  className={css.navLink}
                  to={ROUTES.ABOUT}
                  title="Squirrel shop about page"
                >
                  About us
                </Link>
              </li>
              <li className={css.navItem}>
                <Link
                  className={css.navLink}
                  to={ROUTES.BLOG}
                  title="Squirrel shop blog page"
                >
                  Blog
                </Link>
              </li>
            </ul>
            <div className={css.headerControls}>
              <Link
                className={css.headerLink}
                to={ROUTES.CART}
                title="Squirrel shop cart"
              >
                <div
                  className={css.badge}
                  key={total}
                >
                  {total}
                </div>
                <ShoppingCart />
              </Link>
              <Link
                className={css.headerLink}
                to={ROUTES.FAVORITES}
                title="Squirrel shop favorites"
              >
                <Heart />
              </Link>
            </div>
          </nav>
          <AlignJustify
            onClick={() => setActive((prev) => !prev)}
            className={css.burgerMenu}
            width={40}
            height={40}
          />
        </div>
      </Container>
    </header>
  );
};
