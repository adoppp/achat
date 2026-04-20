import { createBrowserRouter } from 'react-router';

import { AppLayout } from '@/layouts/AppLayout/AppLayout';
import { routerConfig } from '@/routing/routing.config';

export const router = createBrowserRouter([
    {
        path: '/app',
        element: <AppLayout />,
        children: routerConfig
    }
]);