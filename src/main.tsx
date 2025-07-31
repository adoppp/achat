import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import '@/styles/global.scss';
import '@/styles/reset.scss';

import { router } from '@/routing/index.tsx';
import { UsersProvider } from './utils/useUsers';
import { AuthProvider } from './utils/useAuth';
import { UserDocProvider } from './utils/useGetDocUser';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <UserDocProvider>
        <UsersProvider>
          <RouterProvider router={router} />
        </UsersProvider>
      </UserDocProvider>
    </AuthProvider>
  </StrictMode>,
);
