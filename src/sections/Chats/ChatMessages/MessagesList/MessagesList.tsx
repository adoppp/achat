import type { FC, ReactElement } from "react";
import classNames from "classnames/bind";

import styles from '@/sections/Chats/ChatMessages/MessagesList/MessagesList.module.scss';

import { useMessagesList } from "@/sections/Chats/ChatMessages/MessagesList/MessagesList.hooks";

const cn = classNames.bind(styles);

export const MessagesList: FC = (): ReactElement => {    
    const { listRef, messageItems } = useMessagesList();

    return (
        <>
            {
                messageItems.length !== 0 ?
                <ul className={cn('messages')} ref={listRef}>
                    {messageItems}
                </ul> :
                <h1 className={cn('messages__empty')}>No messages yet</h1>
            }
        </>
    );
};
