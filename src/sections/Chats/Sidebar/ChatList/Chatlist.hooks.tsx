import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";

import { firestore } from "@/services";
import type { Chat } from "@/types";
import { ChatItem } from "@/sections/Chats/Sidebar/ChatList/ChatItem/ChatItem";
import { useTimeFormat } from "@/utils/useTimeFormat";
import { useUsers } from "@/utils/useUsers";
import { useAuth } from "@/utils/useAuth";

export const useChatList = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const users = useUsers();
    const { user, loading } = useAuth();

    const chatItems = useMemo(() => {
        return chats
            .map(chat => {
                const otherParticipantId = chat.participants.find(uid => uid !== user?.uid);
                const otherParticipant = users.find(user => user.uid === otherParticipantId);
                const isUnread = chat.lastMessage &&
                    chat.lastMessage.senderId !== user?.uid &&
                    !chat.lastMessage.readBy?.includes(user?.uid as string);

                if (!otherParticipant) return null;
                
                return (
                    <ChatItem 
                        key={chat.id}
                        chatId={chat.id}
                        photoURL={otherParticipant.photoURL}
                        displayName={otherParticipant.displayName}
                        lastMessageText={chat.lastMessage?.text}
                        lastMessageTime={useTimeFormat(chat.lastMessage?.timeStamp?.seconds)}
                        isUnread={isUnread!}
                    />
                );
            })
            .filter(Boolean);
    }, [chats, users, user]);

    useEffect(() => {
        if (!user?.uid) return;

        const q = query(
            collection(firestore, 'chats'),
            where('participants', 'array-contains', user.uid),
            orderBy('updatedAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const chatList = snapshot.docs.map(doc => {
                const data = doc.data() as Omit<Chat, 'id'>;
                return { id: doc.id, ...data };
            });
            setChats(chatList);
        });

        return () => unsubscribe();
    }, [user?.uid]);

    return { chatItems, loading };
};
