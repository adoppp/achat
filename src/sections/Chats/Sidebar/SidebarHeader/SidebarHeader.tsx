import { type FC, type ReactElement } from "react";
import Avatar from "react-avatar";
import classNames from "classnames/bind";

import styles from '@/sections/Chats/Sidebar/SidebarHeader/SidebarHeader.module.scss';

import { IconSearch } from "@/assets/svg";
import { useSidebarHeader } from "@/sections/Chats/Sidebar/SidebarHeader/SidebarHeader.hooks";
import { UsersList } from "@/sections/Chats/Sidebar/SidebarHeader/UsersList/UsersList";
import { Profile } from "@/sections/Chats/Sidebar/SidebarHeader/Profile/Profile";

const cn = classNames.bind(styles);

export const SidebarHeader: FC = (): ReactElement => {
    const { isOpen, toggleOpen, isProfileOpen, toggleIsProfileOpen, user, } = useSidebarHeader();

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
            <UsersList toggleOpen={toggleOpen} isOpen={isOpen}  />
            <Profile toggleOpen={toggleIsProfileOpen} isOpen={isProfileOpen} />
        </>
    );
};
