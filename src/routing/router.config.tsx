import { lazy } from 'react';
import type { LazyExoticComponent, ComponentType, ReactNode } from 'react';

import { PrivateRoute } from '@/routing/PrivateRoute';
import type { RouteObject } from 'react-router';

interface CommonRoute {
  element: ReactNode;
  children?: RouteItem[];
};

type RouteIndex = CommonRoute & { path?: never, index: boolean };
type RoutePath = CommonRoute & { path: string, index?: never };

type RouteItem = RouteIndex | RoutePath;

const Chats = lazy(() => import('@/pages/Chats/Chats'));
const Chat = lazy(() => import('@/pages/Chats/Chat/Chat'));
const SignIn = lazy(() => import('@/pages/Auth/SignIn/SignIn'));
const SignUp = lazy(() => import('@/pages/Auth/SignUp/SignUp'));

const withPrivateRoute = (Component: LazyExoticComponent<ComponentType<any>>): ReactNode => {
  return (
    <PrivateRoute>
      <Component />
    </PrivateRoute>
  );
};

export const RouterConfig: RouteItem[] = [
    {
        path: 'chats',
        element: withPrivateRoute(Chats),
        children: [
            { path: ':chatId', element: <Chat />}
        ]
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

export const mapRoutes = (routes: RouteItem[]): RouteObject[] => {
  return routes.map(route => {
    if ('index' in route && route.index) {
      return {
        index: true,
        element: route.element,
      };
    }

    return {
      path: route.path,
      element: route.element,
      children: route.children ? mapRoutes(route.children) : undefined,
    };
  });
};