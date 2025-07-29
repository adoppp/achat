import type { FC, ReactNode } from "react";
import Avatar from "react-avatar";
import type { User } from "firebase/auth";
import classNames from "classnames/bind";

import styles from '@/sections/Chats/Sidebar/UserInfo/Profile/ProfileSettings/ProfileSettings.module.scss';

import { IconArrowLeft } from "@/assets/svg";
import { useProfileSettings } from "@/sections/Chats/Sidebar/UserInfo/Profile/ProfileSettings/ProfileSettings.hooks";
import { Input } from "@/ui/Input/Input";
import { Button } from "@/ui/Button/Button";

interface ProfileSettingsProps {
    currentUser: User | null;
    closeEdit: () => void;
};

const cn = classNames.bind(styles);

export const ProfileSettings: FC<ProfileSettingsProps> = ({ closeEdit, currentUser }): ReactNode => {
    const { name, setName, handleSubmit } = useProfileSettings({ currentUser, closeEdit });

    return (
        <>
            <div className={cn('profile__heading')}>
                <button type='button' onClick={closeEdit}>
                    {IconArrowLeft}
                </button>
                <h1>Edit profile</h1>
            </div>
            <div className={cn('profile__info')}>
                {
                    currentUser?.photoURL ?
                    <img
                        src={currentUser?.photoURL}
                        alt={currentUser?.displayName as string}
                    /> : 
                    <Avatar name={currentUser?.displayName as string} size="120" textSizeRatio={1.5} round />
                }
                <form onSubmit={handleSubmit} className={cn('form')}>
                    <Input 
                        value={name}
                        onChange={setName}
                        placeholder="New name"
                        id="new-name"
                        customClass={{ container: cn(cn('form__container')) }}
                    />
                    <Button 
                        label="Submit"
                        disabled={name === ''}
                    />
                </form>
            </div>
        </>
    );
};