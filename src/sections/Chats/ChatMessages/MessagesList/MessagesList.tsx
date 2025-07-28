import classNames from "classnames/bind";

import styles from '@/sections/Chats/ChatMessages/MessagesList/MessagesList.module.scss';

import { useMessagesList } from "@/sections/Chats/ChatMessages/MessagesList/MessagesList.hooks";


const cn = classNames.bind(styles);

export const MessagesList = () => {    
    const { listRef, messages, user } = useMessagesList();

    return (
        <ul className={cn('messages')} ref={listRef}>
            {messages.map(message => <li key={message.id} className={cn('message', message.senderId === user?.uid ? 'message__sender' : 'message__receiver')}>{message.text}</li>)}
        </ul>
    );
};
