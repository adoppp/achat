import { lazy } from 'react';
import type { LazyExoticComponent, ComponentType } from 'react';

const Chats = lazy(() => import('../pages/Chats/Chats'));
const SignIn = lazy(() => import('../pages/Auth/SignIn/SignIn'));
const SignUp = lazy(() => import('../pages/Auth/SignUp/SignUp'));

interface CommonRoute {
  element: LazyExoticComponent<ComponentType>;
  children?: RouteItem[];
};

type RouteIndex = CommonRoute & { path?: never, index: boolean };
type RoutePath = CommonRoute & { path: string, index?: never };

type RouteItem = RouteIndex | RoutePath;

export const RouterConfig: RouteItem[] = [
    {
        index: true,
        element: Chats,
    },
    {
        path: 'signin',
        element: SignIn,
    },
    {
        path: 'signup',
        element: SignUp,
    },
];