import type { FC } from 'react';
import { Outlet } from 'react-router';

const MainLayout: FC = () => {
    return (
        <>
            MainLayout
            <Outlet />
        </>
    );
};

export default MainLayout;