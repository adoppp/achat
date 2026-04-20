/* eslint-disable react-refresh/only-export-components */

import { lazy } from 'react';
import type { RouteObject } from 'react-router';

// Layouts
const MainLayout = lazy(() => import('@/layouts/MainLayout/MainLayout'));
const SettingsLayout = lazy(() => import('@/layouts/SettingsLayout/SettingsLayout'));

// Pages
const ChatPage = lazy(() => import('@/pages/app/ChatPage/ChatPage'));
const ChatsPage = lazy(() => import('@/pages/app/ChatsPage/ChatsPage'));
const SignInPage = lazy(() => import('@/pages/auth/SignInPage/SignInPage'));
const SignUpPage = lazy(() => import('@/pages/auth/SignUpPage/SignUpPage'));
const ProfilePage = lazy(() => import('@/pages/app/settings/ProfilePage/ProfilePage'));

export const appConfig: RouteObject[] = [
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
        children: [
            {
                path: 'profile',
                element: <ProfilePage />,
            },
        ],
    },
];

export const authConfig: RouteObject[] = [
    {
        path: 'signin',
        element: <SignInPage />,
    },
    {
        path: 'signup',
        element: <SignUpPage />,
    },
];
