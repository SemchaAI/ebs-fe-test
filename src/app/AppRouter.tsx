import { createBrowserRouter } from 'react-router-dom';
import { BaseLayout } from '@/app/layouts';
import { CartPage, HomePage, MainErrorPage } from '@/pages';

export const appRouter = () =>
  createBrowserRouter([
    {
      element: <BaseLayout />,
      errorElement: <MainErrorPage />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/cart',
          element: <CartPage />,
        },
      ],
    },
  ]);
