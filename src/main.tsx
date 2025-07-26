import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { Provider } from 'react-redux';

import '@/styles/global.scss';
import '@/styles/reset.scss';

import { store } from '@/store/store';
import { router } from '@/routing/index.tsx';
import { UsersListProvider } from './utils/useUsersList';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <UsersListProvider>
        <RouterProvider router={router} />
      </UsersListProvider>
    </Provider>
  </StrictMode>,
);
