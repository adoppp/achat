import type { FC, ReactElement } from "react";
import { Navigate } from "react-router";

export const RestrictedRoute: FC = (): ReactElement => {
    return <Navigate to='chats' replace />;
};