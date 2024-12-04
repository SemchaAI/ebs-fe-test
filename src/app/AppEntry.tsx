import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { CartProvider, ProductsProvider } from '@/contexts';

import { appRouter } from './AppRouter';

import './assets/main.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProductsProvider>
      <CartProvider>
        <RouterProvider router={appRouter()} />
      </CartProvider>
    </ProductsProvider>
  </StrictMode>
);
