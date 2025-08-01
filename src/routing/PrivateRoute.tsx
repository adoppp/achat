import type { FC, ReactElement, ReactNode } from "react";
import { Navigate } from "react-router";

import { Loader } from "@/components/Loader/Loader";
import { useAuth } from "@/utils/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "@/services";

interface PrivateRouteProps {
    children: ReactNode
};

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }): ReactElement => {
    const { user, loading } = useAuth();
    
    if (loading) return <Loader />;

    if (!user?.emailVerified) {
        signOut(auth);

        return <Navigate to='/signin' replace />
    };
    
    return user ? <>{children}</> : <Navigate to='/signin' replace />;
};