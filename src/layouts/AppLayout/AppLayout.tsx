import type { FC } from 'react';
import classNames from 'classnames/bind';
import { Outlet } from 'react-router';

import styles from '@/layouts/AppLayout/AppLayout.module.scss';

const cn = classNames.bind(styles);

export const AppLayout: FC = () => {
    return (
        <div className={cn('app')}>
            <Outlet />
        </div>
    );
};
