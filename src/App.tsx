import { Suspense } from "react";
import { Outlet } from "react-router";

export const App = () => {
  return (
    <>
        <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
        </Suspense>
    </>
  );
};