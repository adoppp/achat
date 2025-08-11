import { type FC, type ReactElement } from "react";
import classNames from "classnames/bind";

import styles from '@/sections/Chats/Sidebar/SidebarHeader/UsersList/UsersList.module.scss';

import { useUsersList } from "./UsersList.hooks";
import { Input } from "@/ui/Input/Input";
import { IconArrowLeft } from "@/assets/svg";

interface UsersListProps {
    isOpen: boolean;
    toggleOpen: () => void;
};

const cn = classNames.bind(styles);

export const UsersList: FC<UsersListProps> = ({ isOpen, toggleOpen }): ReactElement => {
    const { UserListItems, search, setSearch, usersToggleOpen } = useUsersList({ toggleOpen });

    return (
        <section className={cn('users', isOpen && 'users__open')}>
            <div className={cn('users__bar')}>
                <button onClick={usersToggleOpen} className={cn('modal__close')}>
                    {IconArrowLeft}
                </button>
                <Input 
                    value={search}
                    onChange={setSearch}
                    placeholder="Search..."
                    id="search"
                />
            </div>
            <ul>
                {UserListItems}
            </ul>
        </section>
    );
};
