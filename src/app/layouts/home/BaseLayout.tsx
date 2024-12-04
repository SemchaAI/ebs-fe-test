import { Outlet, ScrollRestoration } from 'react-router-dom';
import { MainFooter, MainHeader } from '@/components/widgets';
import css from './baseLayout.module.scss';

export function BaseLayout() {
  return (
    <>
      <MainHeader />
      <main className={css.main}>
        <Outlet />
      </main>
      <MainFooter />
      <ScrollRestoration />
    </>
  );
}
