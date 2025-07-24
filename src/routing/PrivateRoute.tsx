import type { FC, ReactElement, ReactNode } from "react";
import { Navigate } from "react-router";

import { useAppSelector } from "@/store/redux.hooks";
import { userSelector } from "@/store/selectors/authSelector";
import { Loader } from "@/components/Loader/Loader";

interface PrivateRouteProps {
    children: ReactNode
};

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }): ReactElement => {
    const isAuth = useAppSelector(userSelector);

    if (!isAuth.isInitialized) {
        return <Loader />
    }

    return isAuth.uid ? <>{children}</> : <Navigate to='/signin' replace />
};