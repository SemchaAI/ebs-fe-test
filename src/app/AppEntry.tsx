import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { appRouter } from './AppRouter';

import './assets/main.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={appRouter()} />
  </StrictMode>
);
