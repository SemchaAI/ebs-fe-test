import { createBrowserRouter } from 'react-router-dom';
import { BaseLayout } from '@/app/layouts';
import { HomePage } from '@/pages';

export const appRouter = () =>
  createBrowserRouter([
    {
      element: <BaseLayout />,
      errorElement: <div>error</div>,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
      ],
    },
  ]);
