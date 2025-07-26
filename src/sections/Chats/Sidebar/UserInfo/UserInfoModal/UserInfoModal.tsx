import { type FC, type ReactElement } from "react";
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
    const { UserListItems, search, setSearch } = useUserInfoModal({ toggleOpen });

    return (
        <ModalPortal>
                <button onClick={toggleOpen}>x</button>
                <div className={cn('modal__content')}>
                    <Input 
                        value={search}
                        onChange={setSearch}
                        placeholder="Search..."
                        id="search"
                    />
                    <ul>
                        {UserListItems}
                    </ul>
                </div>
        </ModalPortal>
    );
};
