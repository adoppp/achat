import { Suspense } from "react";
import { Outlet } from "react-router";

import { useApp } from "@/App.hooks";
import { Loader } from "@/components/Loader/Loader";

export const App = () => {
    const { } = useApp();
  
    return (
        <>
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
        </>
    );
};