import { type FC, type ReactNode } from "react";
import Avatar from 'react-avatar';
import classNames from "classnames/bind";

import styles from '@/sections/Chats/ChatMessages/FriendInfo/FriendInfo.module.scss';
import { useFriendInfo } from "@/sections/Chats/ChatMessages/FriendInfo/FriendInfo.hooks";

const cn = classNames.bind(styles);

export const FriendInfo: FC = (): ReactNode => {
    const { friend } = useFriendInfo();

    return (
        <section className={cn('friend')}>
            {
                friend?.photoURL ? 
                <img 
                    src={friend?.photoURL} 
                    alt={friend?.displayName ?? 'Not found'} 
                /> :
                <Avatar name={friend?.displayName as string} size="44" round  />
            }
            <h3>
                {friend?.displayName}
            </h3>
        </section>
    );
};
