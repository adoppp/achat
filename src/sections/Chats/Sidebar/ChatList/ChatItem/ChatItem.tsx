import type { FC, ReactNode } from "react";
import { NavLink } from "react-router";
import classNames from "classnames/bind";

import styles from '@/sections/Chats/Sidebar/ChatList/ChatItem/ChatItem.module.scss';

import Avatar from "react-avatar";

interface ChatItemProps {
    chatId: string;
    photoURL: string | null;
    displayName: string | null;
    lastMessageText: string | undefined;
    lastMessageTime: string;
    isUnread: boolean;
};

const cn = classNames.bind(styles);

export const ChatItem: FC<ChatItemProps> = ({ chatId, photoURL, displayName, lastMessageText, lastMessageTime, isUnread }): ReactNode => {
    return (
        <li className={cn('chatitem')}>
            <NavLink to={`/chats/${chatId}`} className={({ isActive }) => cn("chatitem__link", { active: isActive })}>
                <div className={cn('chatitem__main')}>
                    {
                        photoURL ?
                        <img 
                            src={photoURL} 
                            alt={photoURL ?? 'Not found'} 
                        /> :
                        <Avatar name={displayName as string} size="44" className={cn('chatitem__avatar')} round  />
                    }
                    <div className={cn('chatitem__info')}>
                        <h2>
                            {displayName}
                        </h2>
                        <p>
                            {lastMessageText ?? 'No messages yet'}
                        </p>
                    </div>
                </div>
                <p className={cn('chatitem__time')}>
                    {lastMessageTime ?? '--:--'}
                    {
                        isUnread &&
                        <span>
                        </span>
                    }
                </p>
            </NavLink>
        </li>
    );
};
