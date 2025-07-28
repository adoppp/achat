import type { FC, ReactNode } from "react";
import Avatar from "react-avatar";
import classNames from "classnames/bind";

import styles from '@/sections/Chats/Sidebar/UserInfo/ProfileSettings/ProfileSettings.module.scss';

import { ModalPortal } from "@/components/ModalPortal/ModalPortal";
import { IconArrowLeft, IconClose, IconPencil } from "@/assets/svg";
import { useProfileSettings } from "@/sections/Chats/Sidebar/UserInfo/ProfileSettings/ProfileSettings.hooks";

interface ProfileSettingsProps {
    toggleOpen: () => void;
};

const cn = classNames.bind(styles);

export const ProfileSettings: FC<ProfileSettingsProps> = ({ toggleOpen }): ReactNode => {
    const { currentUser, isEdit, EditForm, toggleEdit, aDefault, aEdit } = useProfileSettings();

    return (
        <ModalPortal customContainerClass={cn('profile')}>
            <button type="button" className={cn('profile__close')} onClick={toggleOpen}>
                {IconClose}
            </button>
            <div className={cn('profile__heading')}>
                {
                    isEdit &&
                    <button type="button" className={cn(aEdit ? 'anim__edit' : 'anim__def')} onClick={toggleEdit}>
                        {IconArrowLeft}
                    </button>
                }
                <h1 className={cn(aEdit ? 'anim__edit' : 'anim__def')}>{isEdit ? 'Edit your profile' : 'Settings'}</h1>
                { 
                    !isEdit && 
                    <button type='button' className={cn(aEdit ? 'anim__edit' : 'anim__def')} onClick={toggleEdit}>
                        {IconPencil}
                    </button>
                }
            </div>
            <div className={cn('profile__info')}>
                {
                    currentUser?.photoURL ?
                    <img
                        src={currentUser.photoURL}
                        alt={currentUser.displayName as string}
                    /> : 
                    <Avatar name={currentUser?.displayName as string} size="120" textSizeRatio={1.5} round />
                }
                {
                    !isEdit &&
                    <div className={cn('profile__content', aEdit ? 'anim__edit' : 'anim__def')}>
                        <h2>{currentUser?.displayName}</h2>
                        <p>{currentUser?.email}</p>
                    </div>
                }
                <div className={cn(aEdit ? 'anim__edit' : 'anim__def')}>
                    {EditForm}
                </div>
            </div>
        </ModalPortal>
    );
};