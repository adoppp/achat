import { type FC, type ReactNode } from "react";
import Avatar from "react-avatar";
import classNames from "classnames/bind";

import styles from '@/sections/Chats/Sidebar/SidebarHeader/Profile/ProfileInfo/ProfileInfo.module.scss';

import { IconEmail, IconInfo, IconProfile } from "@/assets/svg";
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

export const ProfileInfo: FC<ProfileInfoProps> = ({ displayName, email, photoURL, bio }): ReactNode => {
    const { setTheme, currentTheme } = useTheme();

    return (
        <div className={cn('profile__info')}>
            {
                photoURL ?
                <img
                    src={photoURL}
                    alt={displayName as string}
                /> : 
                <Avatar name={displayName as string} size="120" textSizeRatio={1.5} round />
            }
            <div className={cn('profile__info__container', 'name__margin')}>
                {IconProfile}
                <div>
                    <p>{displayName}</p>
                    <p>Name</p>
                </div>
            </div>
            <div className={cn('profile__info__container')}>
                {IconEmail}
                <div>
                    <p>{email}</p>
                    <p>Email</p>
                </div>
            </div>
            <div className={cn('profile__info__container')}>
                {IconInfo}
                <div>
                    <p>{bio ? bio : 'No bio yet'}</p>
                    <p>Bio</p>
                </div>
            </div>
            


            <select name="theme" id="theme" value={currentTheme ?? 'light'} onChange={(e) => setTheme(e.currentTarget.value as Theme)}>
                <option value="light">light</option>
                <option value="dark">dark</option>
                <option value="lavender">lavender</option>
            </select>
        </div>
    );
};