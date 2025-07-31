import { type FC, type ReactNode } from "react";
import Avatar from "react-avatar";
import classNames from "classnames/bind";

import styles from '@/sections/Chats/Sidebar/SidebarHeader/Profile/ProfileInfo/ProfileInfo.module.scss';

import { IconLogout, IconPencil } from "@/assets/svg";
import { useProfileInfo } from "@/sections/Chats/Sidebar/SidebarHeader/Profile/ProfileInfo/ProfileInfo.hooks";
import type { Theme } from "@/types";
import { useTheme } from "@/utils/useTheme";

interface ProfileInfoProps {
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    bio: string | null;
    openEdit: () => void;
};

const cn = classNames.bind(styles);

export const ProfileInfo: FC<ProfileInfoProps> = ({ displayName, email, photoURL, bio, openEdit }): ReactNode => {
    const { logout } = useProfileInfo();
    const { setTheme, currentTheme } = useTheme();

    return (
        <>
            <div className={cn('profile__heading')}>
                <h1>Settings</h1>
                <div>
                    <button type="button" onClick={logout}>
                        {IconLogout}
                    </button>
                    <button type='button' onClick={openEdit}>
                        {IconPencil}
                    </button>
                </div>
            </div>
            <div className={cn('profile__info')}>
                {
                    photoURL ?
                    <img
                        src={photoURL}
                        alt={displayName as string}
                    /> : 
                    <Avatar name={displayName as string} size="120" textSizeRatio={1.5} round />
                }
                <h2>{displayName}</h2>
                <p>{email}</p>
                <p>{bio ? bio : 'No bio yet'}</p>
                


                <select name="theme" id="theme" value={currentTheme ?? 'light'} onChange={(e) => setTheme(e.currentTarget.value as Theme)}>
                    <option value="light">light</option>
                    <option value="dark">dark</option>
                    <option value="lavender">lavender</option>
                </select>
            </div>
        </>
    );
};