import type { FC, ReactElement } from "react";
import classNames from "classnames/bind";

import styles from '@/sections/Chats/Sidebar/SidebarHeader/Profile/Profile.module.scss';

import { ModalPortal } from "@/components/ModalPortal/ModalPortal";
import { IconClose } from "@/assets/svg";
import { useProfile } from "@/sections/Chats/Sidebar/SidebarHeader/Profile/Profile.hooks";
import { ProfileInfo } from "@/sections/Chats/Sidebar/SidebarHeader/Profile/ProfileInfo/ProfileInfo";
import { ProfileSettings } from "@/sections/Chats/Sidebar/SidebarHeader/Profile/ProfileSettings/ProfileSettings";

interface ProfileProps {
    toggleOpen: () => void;
};

const cn = classNames.bind(styles);

export const Profile: FC<ProfileProps> = ({ toggleOpen }): ReactElement => {
    const { user, isEdit, animation, closeEdit, openEdit, docUser } = useProfile();

    return (
        <ModalPortal customContainerClass={cn('profile')}>
            <button 
                type="button" 
                className={cn('profile__close')}
                onClick={toggleOpen}
            >
                {IconClose}
            </button>
            <div >
                {
                    isEdit ?
                    <div className={cn(animation)}>
                        <ProfileSettings 
                            currentUser={user} 
                            closeEdit={closeEdit} 
                        />  
                    </div> :
                    <div className={cn(animation === 'anim__close' && 'anim__back')}>
                        <ProfileInfo
                            displayName={user?.displayName as string} 
                            email={user?.email as string} 
                            photoURL={user?.photoURL as string}
                            openEdit={openEdit}
                            bio={docUser!.bio}
                        />
                    </div>
                }
            </div>
        </ModalPortal>
    );
};