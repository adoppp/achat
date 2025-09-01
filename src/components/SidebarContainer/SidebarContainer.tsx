import type { FC, ReactElement, ReactNode } from "react";
import classNames from "classnames/bind";

import styles from '@/components/SidebarContainer/SidebarContainer.module.scss';

interface SidebarProps {
    children: ReactNode
};

const cn = classNames.bind(styles);

export const SidebarContainer: FC<SidebarProps> = ({ children }): ReactElement => {
    return (
        <aside className={cn('sidebar')}>
            {children}
        </aside>
    );
};