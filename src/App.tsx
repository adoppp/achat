import { Suspense } from "react";
import { Outlet } from "react-router";

import { Loader } from "@/components/Loader/Loader";

export const App = () => {  
    return (
        <>
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
        </>
    );
};