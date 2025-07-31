import { type FC, type ReactElement } from "react";
import Avatar from "react-avatar";
import classNames from "classnames/bind";

import styles from '@/sections/Chats/Sidebar/SidebarHeader/SidebarHeader.module.scss';

import { IconSearch } from "@/assets/svg";
import { useSidebarHeader } from "@/sections/Chats/Sidebar/SidebarHeader/SidebarHeader.hooks";

const cn = classNames.bind(styles);

export const SidebarHeader: FC = (): ReactElement => {
    const { Modal, ProfileModal, toggleOpen, toggleIsProfileOpen, user } = useSidebarHeader();

    return (
        <>
            <section className={cn('userinfo')}>
                <div className={cn('userinfo__info')}>
                    <button type="button" onClick={toggleIsProfileOpen}>
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
