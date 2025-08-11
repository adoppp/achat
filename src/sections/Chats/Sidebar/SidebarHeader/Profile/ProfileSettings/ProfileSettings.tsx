import { type FC, type ReactElement } from "react";
import Avatar from "react-avatar";
import type { User } from "firebase/auth";
import classNames from "classnames/bind";

import styles from '@/sections/Chats/Sidebar/SidebarHeader/Profile/ProfileSettings/ProfileSettings.module.scss';

import { IconCheckMark } from "@/assets/svg";
import { useProfileSettings } from "@/sections/Chats/Sidebar/SidebarHeader/Profile/ProfileSettings/ProfileSettings.hooks";
import { Input } from "@/ui/Input/Input";

interface ProfileSettingsProps {
    currentUser: User | null;
    closeEdit: () => void;
};

const cn = classNames.bind(styles);

export const ProfileSettings: FC<ProfileSettingsProps> = ({ closeEdit, currentUser }): ReactElement => {
    const { name, setName, newBio, setNewBio, handleSubmit, docUser } = useProfileSettings({ currentUser, closeEdit });

    return (
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
                <Input 
                    value={newBio}
                    onChange={setNewBio}
                    placeholder="New bio"
                    id="new-bio"
                    customClass={{ container: cn(cn('form__container', 'form__padding')) }}
                />
                {
                    (
                        (name.trim() !== '' && name.trim() !== currentUser?.displayName) || 
                        (newBio.trim() !== '' && newBio.trim() !== docUser.bio)
                    ) &&
                    <button type="submit">
                        {IconCheckMark}
                    </button>
                }
            </form>
        </div>
    );
};