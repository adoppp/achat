import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import '@/styles/global.scss';
import '@/styles/reset.scss';

import { router } from '@/routing/index.tsx';
import { UsersProvider } from './utils/useUsers';
import { AuthProvider } from './utils/useAuth';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <UsersProvider>
        <RouterProvider router={router} />
      </UsersProvider>
    </AuthProvider>
  </StrictMode>,
);
