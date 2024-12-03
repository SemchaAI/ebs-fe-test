import { Outlet, ScrollRestoration } from 'react-router-dom';
import css from './baseLayout.module.css';

export function BaseLayout() {
  return (
    <>
      {/* <MainHeader /> */}
      <main className={css.main}>
        <Outlet />
      </main>
      {/* <MainFooter /> */}
      <ScrollRestoration />
    </>
  );
}
