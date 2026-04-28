import { auth } from "@/firebase";

import type { User } from "@/types/global.types";
import { onAuthStateChanged } from "firebase/auth";

export const subscribeAuth = (cb: (user: User | null) => void) => {
    return onAuthStateChanged(auth, (firebaseUser) => {
        if (!firebaseUser) {
                cb(null);
                return;
        }

        cb({
            id: firebaseUser.uid,
            username: firebaseUser.displayName ?? "",
            lastSeen: Date.now(),
            email: firebaseUser.email,
            phone: firebaseUser.phoneNumber
        });
    });
};