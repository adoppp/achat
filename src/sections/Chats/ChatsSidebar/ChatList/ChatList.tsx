import { type FC, type ReactElement } from "react";
import classNames from "classnames/bind";

import styles from '@/sections/Chats/ChatsSidebar/ChatList/ChatList.module.scss';

import { useChatList } from "@/sections/Chats/ChatsSidebar/ChatList/Chatlist.hooks";
import { Loader } from "@/components/Loader/Loader";

const cn = classNames.bind(styles);

export const ChatList: FC = (): ReactElement => {
    const { chatItems, loading } = useChatList();

    return (
        <ul className={cn('chats')}>
            {loading ? <Loader /> : (chatItems.length !== 0 ? chatItems : <p className={cn('chats__message')}>No chats yet</p>)}
        </ul>
    );
};