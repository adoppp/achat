/* eslint-disable react-refresh/only-export-components */

import { lazy } from 'react';
import type { RouteObject } from 'react-router';

// Layouts
const MainLayout = lazy(() => import('@/layouts/MainLayout/MainLayout'));
const SettingsLayout = lazy(() => import('@/layouts/SettingsLayout/SettingsLayout'));

// Pages
const ChatPage = lazy(() => import('@/pages/ChatPage/ChatPage'));
const ChatsPage = lazy(() => import('@/pages/ChatsPage/ChatsPage'));

export const routerConfig: RouteObject[] = [
    {
        element: <MainLayout />,
        children: [
            {
                path: 'chats',
                element: <ChatsPage />,
            },
            {
                path: 'chat/:chatId',
                element: <ChatPage />,
            },
        ],
    },
    {
        path: 'settings',
        element: <SettingsLayout />,
        children: [],
    },
];
