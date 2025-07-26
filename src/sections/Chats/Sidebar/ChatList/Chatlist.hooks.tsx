import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";

import { auth, firestore } from "@/services";
import type { Chat, SerializedUser } from "@/types";
import { getUsers } from "@/utils/useGetUsers";
import { ChatItem } from "@/sections/Chats/Sidebar/ChatList/ChatItem/ChatItem";
import { useAuthState } from "react-firebase-hooks/auth";

export const useChatList = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [users, setUsers] = useState<SerializedUser[]>([])
    const [user, loadingAuth] = useAuthState(auth);
    const [usersLoading, setUsersLoading] = useState(true);

    const loading = loadingAuth || usersLoading;

    const chatItems = useMemo(() => {
        return chats
            .map(chat => {
                const otherParticipantId = chat.participants.find(uid => uid !== user?.uid);
                const otherParticipant = users.find(user => user.uid === otherParticipantId);

                if (!otherParticipant) return null;

                return (
                    <ChatItem 
                        key={chat.id}
                        chatId={chat.id}
                        photoURL={otherParticipant.photoURL}
                        displayName={otherParticipant.displayName}
                        lastMessageText={chat.lastMessage?.text}
                        lastMessageTime={chat.lastMessage?.timestamp}
                    />
                );
            })
            .filter(Boolean);
    }, [chats, users, user]);

    useEffect(() => {
        if (!user?.uid) return;

        setUsersLoading(true);
        getUsers({ setUsers })
            .finally(() => setUsersLoading(false));
    }, [user?.uid]);

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
