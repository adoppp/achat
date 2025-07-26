import { createContext, useContext, useEffect, useState, type FC, type ReactNode } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "@/services";
import type { SerializedUser } from "@/types";
import { getUsers } from "@/utils/useGetUsers";

interface UsersListProviderProps {
    children: ReactNode;
};

const UsersListContext = createContext<SerializedUser[]>([]);

export const useUsersList = () => useContext(UsersListContext);

export const UsersListProvider: FC<UsersListProviderProps> = ({ children }): ReactNode => {
    const [users, setUsers] = useState<SerializedUser[]>([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        if (!user) return;

        getUsers({ setUsers });
    }, [user]);

    return <UsersListContext.Provider value={users}>{children}</UsersListContext.Provider>
};