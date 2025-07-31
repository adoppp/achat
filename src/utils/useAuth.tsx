import { createContext, useContext, type FC, type ReactElement, type ReactNode } from "react";
import type { User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "@/services";

interface AuthProviderProps {
    children: ReactNode;
};

interface AuthContextState {
  user: User | null;
  loading: boolean;
  error: Error | undefined;
};

const AuthContext = createContext<AuthContextState | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};


export const AuthProvider: FC<AuthProviderProps> = ({ children }): ReactElement => {
    const [user, loading, error] = useAuthState(auth);

    return (
        <AuthContext.Provider value={{ user: user ?? null, loading, error}}>
            {children}
        </AuthContext.Provider>
    );
};