import { Suspense, type FC, type ReactElement } from "react";
import { Outlet } from "react-router";

export const Root: FC = (): ReactElement => {
    return ( 
        <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
        </Suspense>
    )
}