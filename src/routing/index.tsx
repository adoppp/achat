import { createBrowserRouter } from 'react-router';

import { AppLayout } from '@/layouts/AppLayout/AppLayout';
import { appConfig, authConfig } from '@/routing/routing.config';
import { AuthLayout } from '@/layouts/AuthLayout/AuthLayout';

export const router = createBrowserRouter([
    {
        path: 'app',
        element: <AppLayout />,
        children: appConfig,
    },
    {
        path: 'auth',
        element: <AuthLayout />,
        children: authConfig,
    },
]);
