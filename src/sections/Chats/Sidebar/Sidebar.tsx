import type { FC, ReactElement } from "react";
import classNames from "classnames/bind";

import styles from '@/sections/Chats/Sidebar/Sidebar.module.scss';
import { SidebarHeader } from "@/sections/Chats/Sidebar/SidebarHeader/SidebarHeader";
import { ChatList } from "@/sections/Chats/Sidebar/ChatList/ChatList";

const cn = classNames.bind(styles);

export const Sidebar: FC = (): ReactElement => {
  return (
    <aside className={cn('sidebar')}>
        <SidebarHeader />
        <ChatList />
    </aside>
  )
}