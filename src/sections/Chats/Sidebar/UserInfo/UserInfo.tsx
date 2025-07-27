import { type FC, type ReactNode } from "react";
import classNames from "classnames/bind";

import styles from '@/sections/Chats/Sidebar/UserInfo/UserInfo.module.scss';

import userImage from '@/assets/img/user.png';
import { IconSearch } from "@/assets/svg";
import { useUserInfo } from "@/sections/Chats/Sidebar/UserInfo/UserInfo.hooks";

const cn = classNames.bind(styles);

export const UserInfo: FC = (): ReactNode => {
    const { Modal, toggleOpen, user } = useUserInfo();

    return (
        <>
            <section className={cn('userinfo')}>
                <div className={cn('userinfo__info')}>
                    <img 
                        src={user?.photoURL ? user.photoURL : userImage} 
                        alt={user?.displayName ? user.displayName : 'Not found'} 
                    />
                    <h1>Chats</h1>
                </div>
                <button 
                    type="button" 
                    className={cn('userinfo__search')}
                    onClick={toggleOpen}
                >
                    {IconSearch}
                </button>
            </section>
            {Modal}
        </>
    );
};
