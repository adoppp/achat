import { Suspense } from "react";
import { Outlet } from "react-router";

export const RootLayout = () => {
  return (
    <>
    1111
        <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
        </Suspense>
    </>
  );
};
