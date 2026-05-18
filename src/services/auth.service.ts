import { auth, firestore } from '@/firebase';

import type { User } from '@/types/global.types';
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

export const subscribeAuth = (cb: (user: User | null) => void) => {
    return onAuthStateChanged(auth, (firebaseUser) => {
        if (!firebaseUser) {
            cb(null);
            return;
        }

        cb({
            id: firebaseUser.uid,
            username: firebaseUser.displayName ?? '',
            lastSeen: Date.now(),
            email: firebaseUser.email,
            phone: firebaseUser.phoneNumber,
        });
    });
};

export const signUpAuth = async ({
    username,
    email,
    password,
}: {
    username: string;
    email: string;
    password: string;
}) => {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(userCredentials.user, { displayName: username });

    const userRef = doc(firestore, 'users', userCredentials.user.uid);

    await setDoc(userRef, {
        uid: userCredentials.user.uid,
        displayName: username,
        email: userCredentials.user.email,
        photoURL: userCredentials.user.photoURL,
        bio: null,
        createdAt: serverTimestamp(),
    });

    return userCredentials.user;
};
