import { type FC, type ReactElement } from "react";
import classNames from "classnames/bind";

import styles from '@/sections/Chats/Sidebar/SidebarHeader/UsersList/UsersList.module.scss';

import { ModalPortal } from "@/components/ModalPortal/ModalPortal";
import { useUsersList } from "./UsersList.hooks";
import { Input } from "@/ui/Input/Input";
import { IconClose } from "@/assets/svg";

interface UsersListProps {
    toggleOpen: () => void;
};

const cn = classNames.bind(styles);

export const UsersList: FC<UsersListProps> = ({ toggleOpen }): ReactElement => {
    const { UserListItems, search, setSearch } = useUsersList({ toggleOpen });

    return (
        <ModalPortal>
                <button onClick={toggleOpen} className={cn('modal__close')}>
                    {IconClose}
                </button>
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
