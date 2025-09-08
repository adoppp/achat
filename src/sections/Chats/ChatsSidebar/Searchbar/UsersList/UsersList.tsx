import { type FC, type ReactElement } from "react";
import classNames from "classnames/bind";

import styles from '@/sections/Chats/ChatsSidebar/Searchbar/Searchbar.module.scss';

import { useUsersList } from "./UsersList.hooks";

interface UsersListProps {
    closeSearchBar: () => void;
    search: string;
    setSearch: (value: string) => void;
};

const cn = classNames.bind(styles);

export const UsersList: FC<UsersListProps> = ({ closeSearchBar, search, setSearch }): ReactElement => {
    const { UserListItems } = useUsersList({ closeSearchBar, search, setSearch });

    return (
        <section className={cn('users')}>
            <ul>
                {UserListItems}
            </ul>
        </section>
    );
};
