import type { FC, ReactNode } from "react";
import classNames from "classnames/bind";

import styles from '@/sections/Chats/Sidebar/ChatList/ChatItem/ChatItem.module.scss';

import userImage from '@/assets/img/user.png';
import { useNavigate } from "react-router";

interface ChatItemProps {
    chatId: string;
    photoURL: string | null;
    displayName: string | null;
    lastMessageText: string | undefined;
    lastMessageTime: string;
};

const cn = classNames.bind(styles);

export const ChatItem: FC<ChatItemProps> = ({ chatId, photoURL, displayName, lastMessageText, lastMessageTime }): ReactNode => {
    const navigate = useNavigate();
    console.log(chatId)
    
    return (
        <li className={cn('chatitem')} onClick={() => navigate(`/chats/${chatId}`)}>
            <div className={cn('chatitem__main')}>
                <img 
                    src={photoURL ?? userImage} 
                    alt={photoURL ?? 'Not found'} 
                />
                <div className={cn('chatitem__info')}>
                    <h2>
                        {displayName}
                    </h2>
                    <p>
                        {lastMessageText ?? 'No messages yet'}
                    </p>
                </div>
            </div>
            <p>
                {lastMessageTime ?? '--:--'}
            </p>
        </li>
    );
};
