import type { FC, ReactNode } from "react";
import classNames from "classnames/bind";

import styles from '@/sections/Chats/Sidebar/Sidebar.module.scss';
import { UserInfo } from "./UserInfo/UserInfo";
import { ChatList } from "./ChatList/ChatList";

const cn = classNames.bind(styles);

export const Sidebar: FC = (): ReactNode => {
  return (
    <aside className={cn('sidebar')}>
        <UserInfo />
        <ChatList />
    </aside>
  )
}