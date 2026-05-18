import type { FC } from 'react';
import { Outlet, useLocation } from 'react-router';
import classNames from 'classnames/bind';

import styles from '@/layouts/AuthLayout/AuthLayout.module.scss';

const cn = classNames.bind(styles);

export const AuthLayout: FC = () => {
    const location = useLocation();
    const path = location.pathname;
    let title: string = 'Unexcepted route';

    if (path.trim().includes('auth/signup')) title = 'Sign Up';
    if (path.trim().includes('auth/signin')) title = 'Sign In';

    return (
        <div className={cn('auth')}>
            <header className={cn('auth__header')}>
                <div className={cn('auth__header--container')}>
                    <h1 className={cn('auth__header--title')}>{title}</h1>
                </div>
            </header>
            <section className={cn('auth__section-container')}>
                <Outlet />
            </section>
        </div>
    );
};
