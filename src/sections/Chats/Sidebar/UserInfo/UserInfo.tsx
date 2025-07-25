import type { FC, ReactNode } from "react";
import classNames from "classnames/bind";

import styles from '@/sections/Chats/Sidebar/UserInfo/UserInfo.module.scss';

import { auth } from '@/services';
import userImage from '@/assets/img/user.png';
import { IconSearch } from "@/assets/svg";

const cn = classNames.bind(styles);

export const UserInfo: FC = (): ReactNode => {
    const user = auth.currentUser;

    return (
        <div className={cn('userinfo')}>
            <div className={cn('userinfo__info')}>
                <img 
                    src={user?.photoURL ? user.photoURL : userImage} 
                    alt={user?.displayName ? user.displayName : 'Not found'} 
                />
                <h1>{user?.displayName}</h1>
            </div>
            <button type="button" className={cn('userinfo__search')}>
                {IconSearch}
            </button>
        </div>
    );
};
