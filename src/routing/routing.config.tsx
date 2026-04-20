import { lazy } from 'react';
import type { RouteObject } from 'react-router';

const MainLayout = lazy(() => import('@/layouts/MainLayout/MainLayout'));
const SettingsLayout = lazy(() => import('@/layouts/SettingsLayout/SettingsLayout'));

export const routerConfig: RouteObject[] = [
    {
        element: <MainLayout />,
        children: [
            {
                path: 'chats',
                element: <div>chats</div>
            },
            {
                path: 'chat/:chatId',
                element: <div>chat</div>
            }
        ]
    },
    {
        path: 'settings',
        element: <SettingsLayout />,
        children: []
    }
];