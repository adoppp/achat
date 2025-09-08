import type { FC, ReactElement } from "react";
import classNames from "classnames/bind";
import Avatar from "react-avatar";

import styles from '@/sections/Chats/ChatsSidebar/Searchbar/UsersList/UserItem/UserItem.module.scss';

interface UserItemProps {
    displayName: string | null; 
    photoURL: string | null;
    uid: string | null;
    onClick: (uid: string | null) => void;
};

const cn = classNames.bind(styles);

export const UserItem: FC<UserItemProps> = ({ displayName, photoURL, uid, onClick }): ReactElement => {
    const handleClick = () => {
        onClick(uid);
    };

    return (
        <li className={cn('user')} onClick={handleClick}>
            {
                photoURL ?
                <img 
                    src={photoURL} 
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
