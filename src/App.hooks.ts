import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/services";
import { useAppDispatch, useAppSelector } from "@/store/redux.hooks";
import { clearUser, setUser } from "@/store/slices/authSlice";

export const useApp = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                }));
            } else {
                dispatch(clearUser());

            }
        });

        return () => unsubscribe();
    }, [dispatch]);

    return { };
};