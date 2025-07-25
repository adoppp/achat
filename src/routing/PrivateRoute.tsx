import type { FC, ReactElement, ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuthState } from 'react-firebase-hooks/auth';

import { Loader } from "@/components/Loader/Loader";
import { auth } from "@/services";

interface PrivateRouteProps {
    children: ReactNode
};

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }): ReactElement => {
    const [user, loading] = useAuthState(auth);
    
    if (loading) {
        return <Loader />
    }
    
    console.log(user)
    return user ? <>{children}</> : <Navigate to='/signin' replace />
};