import { type FC, type ReactElement, type ReactNode } from "react";
import classNames from "classnames/bind";

import styles from '@/sections/Chats/Sidebar/ChatList/ChatList.module.scss';

import { useChatList } from "@/sections/Chats/Sidebar/ChatList/Chatlist.hooks";
import { Loader } from "@/components/Loader/Loader";

const cn = classNames.bind(styles);

export const ChatList: FC = (): ReactElement => {
    const { chatItems, loading } = useChatList();

    return (
        <section className={cn('chats')}>
            <ul>
                {loading ? <Loader /> : (chatItems.length !== 0 ? chatItems : <p className={cn('chats__message')}>No chats yet</p>)}
            </ul>
        </section>
    );
};