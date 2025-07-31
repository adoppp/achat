import { createContext, useContext, useEffect, useState, type FC, type ReactElement, type ReactNode } from "react";
import { doc, onSnapshot } from "firebase/firestore";

import { firestore } from "@/services";
import type { SerializedUser } from "@/types";
import { useAuth } from "@/utils/useAuth";

interface UserDocProviderProps {
    children: ReactNode;
};

const UserDocContext = createContext<SerializedUser | undefined>(undefined);

export const useUserDoc = () => {
    const context = useContext(UserDocContext);
    if (context === undefined) {
        throw new Error("useUserDoc must be used within a UserDocProvider");
    }
    return context;
};

export const UserDocProvider: FC<UserDocProviderProps> = ({ children }): ReactElement => {
    const [docUser, setDocUser] = useState<SerializedUser | undefined>(undefined);
    const { user } = useAuth();
    
    useEffect(() => {
        if (!user?.uid) return; 

        const userRef = doc(firestore, 'users', user.uid);

        const unsubscribe = onSnapshot(userRef, (snapshot) => {
            const data = snapshot.data();

            if (!data) return;

            const snapUser: SerializedUser = {
                uid: snapshot.id,
                ...data
            } as SerializedUser;

            setDocUser(snapUser);
        })

        return () => unsubscribe();
    }, [user?.uid]);
    
    return(
        <UserDocContext.Provider value={docUser}>
            {children}
        </UserDocContext.Provider>
    );
};