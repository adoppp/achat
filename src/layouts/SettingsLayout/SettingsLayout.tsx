import type { FC } from 'react';
import { Outlet } from 'react-router';

const SettingsLayout: FC = () => {
    return (
        <>
            SettingsLayout
            <Outlet />
        </>
    );
};

export default SettingsLayout;