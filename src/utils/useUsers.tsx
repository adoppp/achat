import { createContext, useContext, useEffect, useState, type FC, type ReactNode } from "react";
import { collection, getDocs } from "firebase/firestore";

import { firestore } from "@/services";
import type { SerializedUser } from "@/types";

interface UsersProviderProps {
    children: ReactNode;
};

const UsersContext = createContext<SerializedUser[]>([]);

export const useUsers = () => useContext(UsersContext);

export const UsersProvider: FC<UsersProviderProps> = ({ children }): ReactNode => {
    const [users, setUsers] = useState<SerializedUser[]>([]);
    
    const getUsers = async () => {
        const usersRef = collection(firestore, 'users');
        const users = await getDocs(usersRef);
        const clearedData = users.docs.map(user => ({...user.data()}));

        setUsers(clearedData as SerializedUser[]);
    };

    useEffect(() => {
        getUsers();
    }, []);

    return <UsersContext.Provider value={users}>{children}</UsersContext.Provider>
};