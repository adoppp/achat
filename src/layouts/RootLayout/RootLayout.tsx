import { Suspense } from "react";
import { Outlet } from "react-router";

export const RootLayout = () => {
  return (
    <>
        <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
        </Suspense>
    </>
  );
};
