import classNames from "classnames/bind";
import { format } from "date-fns";

import styles from '@/sections/Chats/ChatMessages/MessagesList/MessagesList.module.scss';

import { useMessagesList } from "@/sections/Chats/ChatMessages/MessagesList/MessagesList.hooks";


const cn = classNames.bind(styles);

export const MessagesList = () => {    
    const { listRef, messages, user } = useMessagesList();

    return (
        <ul className={cn('messages')} ref={listRef}>
            {
                messages.map(message => {
                    const time = message.timeStamp ? format(new Date(message.timeStamp.seconds * 1000), 'HH:mm') : '';
                    console.log(message.timeStamp)
                    return (    
                        <li key={message.id} className={cn('message', message.senderId === user?.uid ? 'message__sender' : 'message__receiver')}>
                            {message.text}
                            <span>
                                {time}
                            </span>
                        </li>
                    );
                })
            }
        </ul>
    );
};
