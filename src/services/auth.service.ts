import {
    browserLocalPersistence,
    browserSessionPersistence,
    confirmPasswordReset,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification,
    sendPasswordResetEmail,
    setPersistence,
    signInWithEmailAndPassword,
    updateProfile,
    type User,
} from 'firebase/auth';
import { collection, doc, onSnapshot, orderBy, serverTimestamp, setDoc, where } from 'firebase/firestore';

import { auth, firestore } from '@/firebase';
import type { Chat, SerializedUser } from '@/types/global.types';
import { query } from 'firebase/firestore';

const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;

const collections = {
    users: 'users',
    chats: 'chats'
} as const;

export const subscribeAuth = (cb: (user: SerializedUser | null) => void) => {
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

export const signInAuth = async (email: string, password: string, rememberMe: boolean = false): Promise<void> => {
    await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);

    await signInWithEmailAndPassword(auth, email, password);
}

export const verifyByEmail = async (user: User): Promise<void> => {
    await sendEmailVerification(user, {
        url: `${FRONTEND_URL}/auth/signin`,
        handleCodeInApp: true
    });
};

export const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email, {
        url: `${FRONTEND_URL}/auth/signin`,
        handleCodeInApp: true,
    });
}

export const confirmReset = async (code: string, newPassword: string) => {
    await confirmPasswordReset(auth, code, newPassword);
}

export const getChatsByUser = (setChatsData: (chats: Record<string, Chat>) => void) => {
    const q = query(
        collection(firestore, collections.chats),
        where('members', 'array-contains', auth.currentUser?.uid),
        orderBy('lastActivity', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
        const chats = snapshot.docs.reduce<Record<string, Chat>>((acc, doc) => {
            acc[doc.id] = doc.data() as Chat;
            return acc;
        }, {});

        console.log(chats)
        
        setChatsData(chats);
    });
};