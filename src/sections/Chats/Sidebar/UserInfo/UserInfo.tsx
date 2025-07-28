import { type FC, type ReactNode } from "react";
import classNames from "classnames/bind";

import styles from '@/sections/Chats/Sidebar/UserInfo/UserInfo.module.scss';

import { IconSearch } from "@/assets/svg";
import { useUserInfo } from "@/sections/Chats/Sidebar/UserInfo/UserInfo.hooks";
import Avatar from "react-avatar";

const cn = classNames.bind(styles);

export const UserInfo: FC = (): ReactNode => {
    const { Modal, toggleOpen, user } = useUserInfo();

    return (
        <>
            <section className={cn('userinfo')}>
                <div className={cn('userinfo__info')}>
                    {
                        user?.photoURL ?
                        <img 
                        src={user?.photoURL} 
                        alt={user?.displayName ? user.displayName : 'Not found'} 
                        /> :
                        <Avatar name={user?.displayName as string} size="32" textSizeRatio={2} round/>
                    }
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
