import { type FC, type ReactElement } from "react";
import Avatar from 'react-avatar';
import classNames from "classnames/bind";

import styles from '@/sections/Chats/ChatMessages/FriendInfo/FriendInfo.module.scss';
import { useFriendInfo } from "@/sections/Chats/ChatMessages/FriendInfo/FriendInfo.hooks";

const cn = classNames.bind(styles);

export const FriendInfo: FC = (): ReactElement => {
    const { friend, Modal, toggleOpen } = useFriendInfo();

    return (
        <>
            <section className={cn('friend')}>
                <button type="button" onClick={toggleOpen}>
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
                </button>
            </section>
            {Modal}
        </>
    );
};
