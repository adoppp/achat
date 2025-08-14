import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { format } from "date-fns";
import classNames from "classnames/bind";

import styles from '@/sections/Chats/ChatMessages/MessagesList/MessagesList.module.scss';

import { firestore } from "@/services";
import type { Message } from "@/types";
import { useAuth } from "@/utils/useAuth";

const cn = classNames.bind(styles);

export const useMessagesList = () => {
    const { chatId } = useParams<{ chatId: string }>();
    const [messages, setMessages] = useState<Message[]>([]);
    const { user } = useAuth();
    const listRef = useRef<HTMLUListElement>(null); 

    const messageItems = messages.map(message => {
            const time = message.timeStamp ? format(new Date(message.timeStamp.seconds * 1000), 'HH:mm') : '';
            return (    
                <li key={message.id} className={cn('message', message.senderId === user?.uid ? 'message__sender' : 'message__receiver')}>
                    <p>
                        {message.text}
                    </p>
                    <span>
                        {time}
                        <div>
                            {time}
                        </div>
                    </span>
                </li>
            );
        });

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

    return { listRef, messageItems };
};