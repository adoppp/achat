import { createBrowserRouter } from "react-router";

import { App } from "@/App";
import { mapRoutes, RouterConfig, RouterConfigV2 } from "@/routing/router.config";
import { Root } from "@/components/Root/Root";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: mapRoutes(RouterConfig)
    },
    {
        path: '/v2',
        element: <Root />,
        children: mapRoutes(RouterConfigV2)
    }
]);