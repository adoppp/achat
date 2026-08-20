import { ChatCard } from '@/components/Sidebar/tabs/ChatsTab/ChatCard/ChatCard';
import classNames from 'classnames/bind';
import { useState, type FC } from 'react';
import { IoAdd, IoSearchOutline } from 'react-icons/io5';

import styles from '@/components/Sidebar/tabs/ChatsTab/ChatsTab.module.scss';
import { Button } from '@/ui/Button/Button';
import { Input } from '@/ui/Input/Input';
import { useChatsListener } from '@/hooks/useChatsListener';
import { useAppSelector } from '@/redux/redux.hooks';

const cn = classNames.bind(styles);

export const ChatsTab: FC = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const chatsState = useAppSelector(state => state.chats);
    const chats = chatsState.items;

//     const filteredChats = Object.entries(chats).filter(([_, chat]) =>
//     chat.name.toLowerCase().includes(searchValue.toLowerCase())
// );

    const items = Object.entries(chats).map(([cid, chat]) => {
        return <ChatCard key={cid} {...chat} />;
    });

    useChatsListener()

    return (
        <div className={cn('chats__tab')}>
            <div className={cn('chats__tab--search-container')}>
                <Input
                    value={searchValue}
                    onChange={setSearchValue}
                    placeholder="Search"
                    variant="glass"
                    rightIcon={<IoSearchOutline className={cn('chats__tab--search-icon')} />}
                    customClass={{
                        container: cn('chats__tab--search-input'),
                    }}
                />
                <Button variant="tertiary" customClassName={cn('chats__tab--search-button')}>
                    <IoAdd className={cn('chats__tab--search-button_icon')} />
                </Button>
            </div>
            {
                items.length > 0 ? (
                    <ul className={cn('chats__tab--list')}>{items}</ul>
                ) : (
                    <div className={cn('chats__tab--null-container')}>
                        <p className={cn('chats__tab--null-description')}>
                            You have no chats
                        </p>
                        <Button size='l'>
                            Communicate!
                        </Button>
                    </div>
                )
            }
        </div>
    );
};
