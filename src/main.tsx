import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import '@/styles/global.scss';
import '@/styles/reset.scss';

import { router } from '@/routing/index.tsx';
import { UsersListProvider } from './utils/useUsersList';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UsersListProvider>
      <RouterProvider router={router} />
    </UsersListProvider>
  </StrictMode>,
);
