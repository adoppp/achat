import { signOut } from "firebase/auth";

import { auth } from "@/services";

export const useProfileInfo = () => {
    const logout = () => {
        signOut(auth);
    };

    return { logout };
};