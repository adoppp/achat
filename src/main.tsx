import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { Provider } from 'react-redux';

import '@/styles/global.scss';
import '@/styles/reset.scss';

import { router } from '@/routing';
import { store } from '@/redux/store';
import { ModalProvider } from './components/Modal/ModalProvider';
import { ModalWrapper } from './components/Modal/Modal.wrapper';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ModalProvider>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
            <ModalWrapper />
        </ModalProvider>
    </StrictMode>,
);
