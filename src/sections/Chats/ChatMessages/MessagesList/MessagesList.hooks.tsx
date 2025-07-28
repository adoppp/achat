import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, firestore } from "@/services";
import type { Message } from "@/types";

export const useMessagesList = () => {
    const { chatId } = useParams<{ chatId: string }>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [user] = useAuthState(auth);
    const listRef = useRef<HTMLUListElement>(null); 

    useEffect(() => {
        if (!chatId) return;

        const messagesRef = collection(firestore, 'chats', chatId, 'messages');

        const q = query(messagesRef, orderBy('timeStamp'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(data as Message[]);
        });

        return () => unsubscribe();
    }, [chatId]);

    useEffect(() => {
        if (listRef.current) {
            requestAnimationFrame(() => {
                listRef.current!.scrollTop = listRef.current!.scrollHeight;
            });
        }
    }, [messages]);

    return { listRef, messages, user };
};