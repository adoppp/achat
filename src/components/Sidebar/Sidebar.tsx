import classNames from 'classnames/bind';
import { useEffect, useState, type FC } from 'react';

import styles from '@/components/Sidebar/Sidebar.module.scss';

import { useLocation } from 'react-router';
import { tabs } from './Sidebar.config';
import type { SidebarTab } from './Sidebar.types';
import { SidebarNavbar } from './SidebarNavbar/SidebarNavbar';

const cn = classNames.bind(styles);

const SidebarRoot: FC = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState<SidebarTab>(() => {
        if (location.pathname.startsWith('/settings')) {
            return 'settings'
        } else if (location.pathname.startsWith('/chat')) {
            return 'chats'
        } else {
            return 'chats'
        }
    });
    const Tab: FC = tabs[activeTab];

    return (
        <aside className={cn('sidebar')}>
            <div className={cn('sidebar__container')}>
                <Tab />
                <SidebarNavbar handleSetNewTab={setActiveTab} />
            </div>
        </aside>
    );
};

export const Sidebar = Object.assign(SidebarRoot, {
    SidebarNavbar,
});
