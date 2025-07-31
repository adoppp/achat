import { createContext, useContext, useEffect, useState, type FC, type ReactNode } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "@/services";
import type { SerializedUser } from "@/types";
import { getUsers } from "@/utils/useGetUsers";

interface UsersProviderProps {
    children: ReactNode;
};

const UsersContext = createContext<SerializedUser[]>([]);

export const useUsers = () => useContext(UsersContext);

export const UsersProvider: FC<UsersProviderProps> = ({ children }): ReactNode => {
    const [users, setUsers] = useState<SerializedUser[]>([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        if (!user) return;

        getUsers({ setUsers });
    }, [user]);

    return <UsersContext.Provider value={users}>{children}</UsersContext.Provider>
};