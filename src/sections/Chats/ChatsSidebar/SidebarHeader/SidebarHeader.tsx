import { type FC, type ReactElement } from "react";
import classNames from "classnames/bind";

import styles from '@/sections/Chats/ChatsSidebar/SidebarHeader/SidebarHeader.module.scss';

import { useSidebarHeader } from "@/sections/Chats/ChatsSidebar/SidebarHeader/SidebarHeader.hooks";
import { IconNewChat, IconSettings } from "@/assets/svg";
import { NavLink } from "react-router";

const cn = classNames.bind(styles);

export const SidebarHeader: FC = (): ReactElement => {
    const { } = useSidebarHeader();

    return (
        <section className={cn('userinfo')}>
            <div className={cn('userinfo__info')}>
                <NavLink to='/settings' className={cn('userinfo__icon')}>
                    {IconSettings}
                </NavLink>
                <h1>Chats</h1>
                <button className={cn('userinfo__icon')}>
                    {IconNewChat}
                </button>
            </div>
        </section>
    );
};
