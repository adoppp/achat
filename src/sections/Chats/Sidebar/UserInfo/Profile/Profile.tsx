import type { FC, ReactNode } from "react";
import classNames from "classnames/bind";

import styles from '@/sections/Chats/Sidebar/UserInfo/Profile/Profile.module.scss';

import { ModalPortal } from "@/components/ModalPortal/ModalPortal";
import { IconClose } from "@/assets/svg";
import { useProfile } from "@/sections/Chats/Sidebar/UserInfo/Profile/Profile.hooks";
import { ProfileInfo } from "@/sections/Chats/Sidebar/UserInfo/Profile/ProfileInfo/ProfileInfo";
import { ProfileSettings } from "@/sections/Chats/Sidebar/UserInfo/Profile/ProfileSettings/ProfileSettings";

interface ProfileProps {
    toggleOpen: () => void;
};

const cn = classNames.bind(styles);

export const Profile: FC<ProfileProps> = ({ toggleOpen }): ReactNode => {
    const { currentUser, isEdit, animation, closeEdit, openEdit } = useProfile();

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
                            currentUser={currentUser} 
                            closeEdit={closeEdit} 
                        />  
                    </div> :
                    <div className={cn(animation === 'anim__close' && 'anim__back')}>
                        <ProfileInfo
                            displayName={currentUser?.displayName as string} 
                            email={currentUser?.email as string} 
                            photoURL={currentUser?.photoURL as string}
                            openEdit={openEdit}
                        />
                    </div>
                }
            </div>
        </ModalPortal>
    );
};