import { useEffect, useState } from "react";
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'

import { auth, firestore } from "@/services";
import type { SerializedUser } from "@/types";
import { UserItem } from "@/sections/Chats/Sidebar/UserInfo/UserInfoModal/UserItem/UserItem";
import { getUsers } from "@/utils/useGetUsers";

interface useUserInfoModalProps {
    toggleOpen: () => void;
}

export const useUserInfoModal = ({ toggleOpen }: useUserInfoModalProps) => {
    const [users, setUsers] = useState<SerializedUser[]>([]);
    const [search, setSearch] = useState<string>('');
    const currentUser = auth.currentUser;

    const filteredUsersList = () => {
        if (search.trim().length > 0) {
            const filtered = users.filter(user => user.displayName?.includes(search) && user.displayName !== currentUser?.displayName);
            return filtered;
        } else {

            return [];
        }
    };

    const handleClick = async (uid: string | null) => {
        const chatId = [currentUser?.uid, uid].sort().join("_");
        const chatRef = doc(firestore, 'chats', chatId);
        const chatSnap = await getDoc(chatRef);

        if (chatSnap.exists()) return;

        await setDoc(chatRef, {
            participants: [currentUser?.uid, uid],
            lastMessage: null,
            updatedAt: serverTimestamp(),
        });

        toggleOpen();
    };

    const UserListItems = filteredUsersList().map(user => 
        <UserItem 
            key={user.uid}
            displayName={user.displayName} 
            photoURL={user.photoURL}
            uid={user.uid}
            onClick={handleClick}
        />
    );

    useEffect(() => {
        getUsers({ setUsers });
    }, []);

    return { UserListItems, search, setSearch };
};