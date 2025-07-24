import { createElement, lazy } from 'react';
import type { LazyExoticComponent, ComponentType, ReactNode } from 'react';

import { PrivateRoute } from '@/routing/PrivateRoute';

interface CommonRoute {
  element: ReactNode;
  children?: RouteItem[];
};

type RouteIndex = CommonRoute & { path?: never, index: boolean };
type RoutePath = CommonRoute & { path: string, index?: never };

type RouteItem = RouteIndex | RoutePath;

const Chats = lazy(() => import('@/pages/Chats/Chats'));
const SignIn = lazy(() => import('@/pages/Auth/SignIn/SignIn'));
const SignUp = lazy(() => import('@/pages/Auth/SignUp/SignUp'));

const withPrivateRoute = (Component: LazyExoticComponent<ComponentType>) => <PrivateRoute>{createElement(Component)}</PrivateRoute>;

export const RouterConfig: RouteItem[] = [
    {
        index: true,
        element: withPrivateRoute(Chats),
    },
    {
        path: 'signin',
        element: <SignIn />,
    },
    {
        path: 'signup',
        element: <SignUp />,
    },
];