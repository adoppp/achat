import { Suspense } from "react";
import { Outlet } from "react-router";

import { Loader } from "@/components/Loader/Loader";
import { useTheme } from "@/utils/useTheme";

export const App = () => {  
    useTheme();
    
    return (
        <>
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
        </>
    );
};