import type { FC, ReactElement } from "react";
import Avatar from "react-avatar";
import classNames from "classnames/bind";

import styles from '@/sections/Chats/ChatMessages/FriendInfo/InfoModal/InfoModal.module.scss';

import { ModalPortal } from "@/components/ModalPortal/ModalPortal";
import { IconClose, IconEmail, IconInfo, IconProfile } from "@/assets/svg";

interface InfoModalProps {
    displayName: string | null;
    photoURL: string | null
    email: string | null;
    bio: string | null;
    toggleOpen: () => void;
};

const cn = classNames.bind(styles);

export const InfoModal: FC<InfoModalProps> = ({ displayName, photoURL, email, bio, toggleOpen }): ReactElement => {
    return (
        <ModalPortal>
            <div className={cn('container')}>
                <button 
                    type="button" 
                    className={cn('profile__close')}
                    onClick={toggleOpen}
                >
                    {IconClose}
                </button>
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
                </div>
            </div>
        </ModalPortal>
    );
};
