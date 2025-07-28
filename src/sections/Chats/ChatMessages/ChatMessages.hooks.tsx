import { useEffect, useState, type FormEvent } from "react"
import { useParams } from "react-router";
import { addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, firestore } from "@/services";

export const useChatMessages = () => {
    const { chatId } = useParams<{ chatId: string }>();
    const [message, setMessage] = useState<string>('');
    const [user] = useAuthState(auth);

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (message === '') return;
        if (!chatId) return;

        const messageRef = collection(firestore, 'chats', chatId, 'messages');
        const chatRef = doc(firestore, 'chats', chatId);

        await addDoc(messageRef, {
            senderId: user?.uid,
            text: message,
            timeStamp: serverTimestamp(),
            type: 'text',
            readBy: user?.uid
        });

        await updateDoc(chatRef, { 
            lastMessage: {
                text: message,
                timeStamp: serverTimestamp(),
                readBy: [user?.uid],
                senderId: user?.uid,
            },
            updatedAt: serverTimestamp(),
        });

        setMessage('');
    };

    useEffect(() => {
        if (!chatId || !user?.uid) return;

        const chatRef = doc(firestore, 'chats', chatId);

        updateDoc(chatRef, {
            'lastMessage.readBy': arrayUnion(user.uid),
        });
    }, [chatId, user?.uid]);

    return { message, setMessage, sendMessage };
};