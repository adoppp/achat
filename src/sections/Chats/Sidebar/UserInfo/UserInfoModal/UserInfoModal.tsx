import { type FC, type ReactElement } from "react";
import classNames from "classnames/bind";

import styles from '@/sections/Chats/Sidebar/UserInfo/UserInfoModal/UserInfoModal.module.scss';

import { ModalPortal } from "@/components/ModalPortal/ModalPortal";
import { useUserInfoModal } from "./UserInfoModal.hooks";
import { Input } from "@/ui/Input/Input";
import { UserItem } from "./UserItem/UserItem";

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
                            filteredUsersList().map(user => <UserItem displayName={user.displayName} photoURL={user.photoURL} />)
                        }
                    </ul>
                </div>
            </section>
        </ModalPortal>
    );
};
