import { useState, type FC, type ReactElement } from "react";
import classNames from "classnames/bind";

import styles from '@/sections/Chats/Sidebar/UserInfo/UserInfoModal/UserInfoModal.module.scss';

import { ModalPortal } from "@/components/ModalPortal/ModalPortal";
import { useUserInfoModal } from "./UserInfoModal.hooks";
import { Input } from "@/ui/Input/Input";

interface UserInfoModalProps {
    toggleOpen: () => void;
};

const cn = classNames.bind(styles);

export const UserInfoModal: FC<UserInfoModalProps> = ({ toggleOpen }): ReactElement => {
    const { filteredUsersList, search, setSearch } = useUserInfoModal();

    return (
        <ModalPortal>
            <section className={cn('modal')}>
                <button onClick={toggleOpen}>x</button>
                <div className={cn('modal__content')}>
                    <Input 
                        value={search}
                        onChange={setSearch}
                        placeholder="Search..."
                        id="search"
                    />
                    <ul>
                        {
                            filteredUsersList().map(item => <li key={item.displayName}>{item.displayName}</li>)
                        }
                    </ul>
                </div>
            </section>
        </ModalPortal>
    );
};
