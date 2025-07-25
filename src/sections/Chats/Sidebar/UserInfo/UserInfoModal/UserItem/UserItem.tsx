import type { FC } from "react";
import classNames from "classnames/bind";

import styles from '@/sections/Chats/Sidebar/UserInfo/UserInfoModal/UserItem/UserItem.module.scss';

import userImage from '@/assets/img/user.png';

interface UserItemProps {
    displayName: string | null; 
    photoURL: string | null;
};

const cn = classNames.bind(styles);

export const UserItem: FC<UserItemProps> = ({ displayName, photoURL }) => {
    return (
        <li className={cn('user')}>
            <img 
                src={photoURL ? photoURL : userImage} 
                alt={displayName ? displayName : 'Not found'}
            />
            <h3>
                {displayName}
            </h3>
        </li>
    );
};
