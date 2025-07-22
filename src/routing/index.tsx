import { createBrowserRouter } from "react-router";

import { App } from "@/App";
import { RouterConfig } from "@/routing/router.config";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: RouterConfig.map(({ index, path, element: Component}) => {
            return (
                {
                    path,
                    index,
                    element: <Component />
                }
            )
        }),
    }
]);