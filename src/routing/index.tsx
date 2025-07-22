import { createBrowserRouter } from "react-router";

import { RootLayout } from "@/layouts/RootLayout/RootLayout";
import { RouterConfig } from "@/routing/router.config";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
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