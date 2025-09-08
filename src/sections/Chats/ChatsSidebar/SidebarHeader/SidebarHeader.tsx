import { type FC, type ReactElement } from "react";
import classNames from "classnames/bind";

import styles from '@/sections/Chats/ChatsSidebar/SidebarHeader/SidebarHeader.module.scss';

import { useSidebarHeader } from "@/sections/Chats/ChatsSidebar/SidebarHeader/SidebarHeader.hooks";
import { IconBurger, IconNewChat } from "@/assets/svg";

const cn = classNames.bind(styles);

export const SidebarHeader: FC = (): ReactElement => {
    const { navigate } = useSidebarHeader();

    return (
        <section className={cn('userinfo')}>
            <div className={cn('userinfo__info')}>
                <button className={cn('userinfo__icon')}>
                    {IconBurger}
                </button>
                <h1>Chats</h1>
                <button className={cn('userinfo__icon')}>
                    {IconNewChat}
                </button>
            </div>
        </section>
    );
};
