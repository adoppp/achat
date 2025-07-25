import { type FC, type ReactNode } from "react";
import classNames from "classnames/bind";

import styles from '@/sections/Chats/Sidebar/ChatList/ChatList.module.scss';

import { useChatList } from "@/sections/Chats/Sidebar/ChatList/Chatlist.hooks";
import { Loader } from "@/components/Loader/Loader";

const cn = classNames.bind(styles);
export const ChatList: FC = (): ReactNode => {
    const { chatItems, loading } = useChatList();

    return (
        <div className={cn('chats')}>
            <ul>
                {loading ? <Loader /> : chatItems}
            </ul>
        </div>
    );
};