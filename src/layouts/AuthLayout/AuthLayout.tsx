import type { FC } from 'react';
import { Outlet } from 'react-router';

export const AuthLayout: FC = () => {
    return (
        <>
            AuthLayout
            <Outlet />
        </>
    );
};
