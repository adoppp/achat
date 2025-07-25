import { useEffect, useState } from "react";
import { firestore } from "@/services";
import { collection, getDocs } from 'firebase/firestore'
import type { SerializedUser } from "@/types";

export const useUserInfoModal = () => {
    const [users, setUsers] = useState<SerializedUser[]>([]);
    const [search, setSearch] = useState<string>('');
    const usersRef = collection(firestore, 'users');

    const getUsers = async () => {
        const users = await getDocs(usersRef);
        const clearedData = users.docs.map(user => ({...user.data()}))

        setUsers(clearedData as SerializedUser[]);
    };

    const filteredUsersList = () => {
        if (search.trim().length > 0) {
            const filtered = users.filter(user => user.displayName?.includes(search));
            return filtered;
        } else {

            return [];
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return { filteredUsersList, search, setSearch };
};