import { type FC, type ReactNode } from "react";
import Avatar from "react-avatar";
import classNames from "classnames/bind";

import styles from '@/sections/Chats/Sidebar/UserInfo/UserInfo.module.scss';

import { IconSearch } from "@/assets/svg";
import { useUserInfo } from "@/sections/Chats/Sidebar/UserInfo/UserInfo.hooks";

const cn = classNames.bind(styles);

export const UserInfo: FC = (): ReactNode => {
    const { Modal, ProfileModal, toggleOpen, toggleIsSettingsOpen, user } = useUserInfo();

    return (
        <>
            <section className={cn('userinfo')}>
                <div className={cn('userinfo__info')}>
                    <button type="button" onClick={toggleIsSettingsOpen}>
                        {
                            user?.photoURL ?
                            <img 
                            src={user?.photoURL} 
                            alt={user?.displayName ? user.displayName : 'Not found'} 
                            /> :
                            <Avatar name={user?.displayName as string} size="32" textSizeRatio={2} round/>
                        }
                    </button>
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
            {ProfileModal}
        </>
    );
};
