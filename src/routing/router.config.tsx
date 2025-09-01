import { lazy } from 'react';
import type { LazyExoticComponent, ComponentType, ReactNode } from 'react';

import { PrivateRoute } from '@/routing/PrivateRoute';
import type { RouteObject } from 'react-router';
import { RestrictedRoute } from './RestrictedRoute';
import ChatsV2 from '@/pages/ChatsV2/ChatsV2';

interface CommonRoute {
  element: ReactNode;
  children?: RouteItem[];
};

type RouteIndex = CommonRoute & { path?: never, index: boolean };
type RoutePath = CommonRoute & { path: string, index?: never };

type RouteItem = RouteIndex | RoutePath;

const SignIn = lazy(() => import('@/pages/Auth/SignIn/SignIn'));
const SignUp = lazy(() => import('@/pages/Auth/SignUp/SignUp'));

const Chats = lazy(() => import('@/pages/Chats/Chats'));
const ChatDefault = lazy(() => import('@/pages/Chats/ChatDefault/ChatDefault'));
const Chat = lazy(() => import('@/pages/Chats/Chat/Chat'));

const Settings = lazy(() => import('@/pages/Settings/Settings'));

const Signin = lazy(() => import('@/pages/AuthV2/SignUp/SignUp'));

const withPrivateRoute = (Component: LazyExoticComponent<ComponentType<any>>): ReactNode => {
  return (
    <PrivateRoute>
      <Component />
    </PrivateRoute>
  );
};

export const RouterConfig: RouteItem[] = [
  {
    index: true,
    element: <RestrictedRoute />,
  },
  {
    path: 'signin',
    element: <SignIn />,
  },
  {
    path: 'signup',
    element: <SignUp />,
  },
  {
    path: 'chats',
    element: withPrivateRoute(Chats),
    children: [
      { index: true, element: <ChatDefault />},
      { path: ':chatId', element: <Chat />}
    ]
  },
  {
    path: 'settings',
    element: <Settings />
  }
];

export const RouterConfigV2: RouteItem[] = [
  {
    path: 'chats',
    element: <ChatsV2 />
  },
  {
    path: 'signin',
    element: <Signin />
  }
]

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