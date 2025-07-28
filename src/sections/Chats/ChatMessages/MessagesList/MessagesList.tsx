import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import classNames from "classnames/bind";

import styles from '@/sections/Chats/ChatMessages/MessagesList/MessagesList.module.scss';

import { auth, firestore } from "@/services";
import type { Message } from "@/types";
import { useAuthState } from "react-firebase-hooks/auth";

const cn = classNames.bind(styles);

export const MessagesList = () => {
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
    
  return (
    <ul className={cn('messages')} ref={listRef}>
        {messages.map(message => <li key={message.id} className={cn('message', message.senderId === user?.uid ? 'message__sender' : 'message__receiver')}>{message.text}</li>)}
    </ul>
  )
}
