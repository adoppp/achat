import { type FC, type ReactElement } from "react";
import classNames from "classnames/bind";

import styles from '@/sections/Chats/ChatsSidebar/Searchbar/Searchbar.module.scss';

import { Input } from "@/ui/Input/Input";
import { IconArrowLeft } from "@/assets/svg";
import { UsersList } from "./UsersList/UsersList";
import { useSearchbar } from "./Searchbar.hooks";

const cn = classNames.bind(styles);

export const Searchbar: FC = (): ReactElement => {
    const { 
        search, 
        setSearch, 
        isOpen, 
        setIsOpen, 
        closeSearchBar 
    } = useSearchbar();

    return (
        <section className={cn('searchbar', { 'active': isOpen })}>
            <form className={cn('searchbar__form')} onFocus={() => setIsOpen(true)}>
                {
                    isOpen &&
                    <button 
                        type="button" 
                        className={cn('searchbar__button')}
                        onClick={closeSearchBar}
                    >
                        {IconArrowLeft}
                    </button>
                }
                <Input 
                    value={search}
                    onChange={(e) => setSearch(e)}
                    id="search"
                    placeholder="Search"
                    customClass={{
                        input: cn('searchbar__input')
                    }}
                />
            </form>
            {
                isOpen && 
                <UsersList 
                    closeSearchBar={closeSearchBar}
                    search={search}
                    setSearch={setSearch}
                />
            }
        </section>
    );
};