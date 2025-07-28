import type { FC } from "react";
import classNames from "classnames/bind";

import styles from '@/sections/Chats/Sidebar/UserInfo/UserInfoModal/UserItem/UserItem.module.scss';

import userImage from '@/assets/img/user.png';
import Avatar from "react-avatar";

interface UserItemProps {
    displayName: string | null; 
    photoURL: string | null;
    uid: string | null;
    onClick: (uid: string | null) => void;
};

const cn = classNames.bind(styles);

export const UserItem: FC<UserItemProps> = ({ displayName, photoURL, uid, onClick }) => {
    const handleClick = () => {
        onClick(uid);
    };

    return (
        <li className={cn('user')} onClick={handleClick}>
            {
                photoURL ?
                <img 
                    src={photoURL ? photoURL : userImage} 
                    alt={displayName ? displayName : 'Not found'}
                /> :
                <Avatar name={displayName as string} size="32" textSizeRatio={2} className={cn('user__avatar')} round />
            }
            <h3>
                {displayName}
            </h3>
        </li>
    );
};
