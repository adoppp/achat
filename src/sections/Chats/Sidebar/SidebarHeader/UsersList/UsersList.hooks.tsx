import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

import { firestore } from "@/services";
import { UserItem } from "@/sections/Chats/Sidebar/SidebarHeader/UsersList/UserItem/UserItem";
import { useUsers } from "@/utils/useUsers";
import { useAuth } from "@/utils/useAuth";

interface useUsersListProps {
    toggleOpen: () => void;
}

export const useUsersList = ({ toggleOpen }: useUsersListProps) => {
    const users = useUsers();
    const [search, setSearch] = useState<string>('');
    const navigate = useNavigate();
    const { user: currentUser } = useAuth();

    const filteredUsersList = useMemo(() => {
        if (search.trim().length > 0) {
            const filtered = users.filter(user => user.displayName?.toLowerCase().includes(search.toLowerCase()) && user.displayName !== currentUser?.displayName);
            return filtered;
        } else {
            return [];
        }
    }, [users, search, currentUser]);

    const handleClick = async (uid: string | null) => {
        const chatId = [currentUser?.uid, uid].sort().join("_");
        const chatRef = doc(firestore, 'chats', chatId);
        const chatSnap = await getDoc(chatRef);

        if (chatSnap.exists()) {
            toggleOpen();
            setSearch('');
            navigate(`/chats/${chatId}`)
        } else {
            try {
                await setDoc(chatRef, {
                    participants: [currentUser?.uid, uid],
                    lastMessage: null,
                    updatedAt: serverTimestamp(),
                });
        
                toggleOpen();
                setSearch('');
                navigate(`/chats/${chatId}`);
            } catch (e) {
                console.log('UsersList: ', e);
            }
        };
    };

    const UserListItems = filteredUsersList.map(user => 
        <UserItem 
            key={user.uid}
            displayName={user.displayName} 
            photoURL={user.photoURL}
            uid={user.uid}
            onClick={handleClick}
        />
    );

    return { UserListItems, search, setSearch };
};