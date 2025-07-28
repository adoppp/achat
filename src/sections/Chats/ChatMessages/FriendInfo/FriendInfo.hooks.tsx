import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { doc, getDoc } from "firebase/firestore";

import { auth, firestore } from "@/services";
import type { Chat, SerializedUser } from "@/types";
import { useUsersList } from "@/utils/useUsersList";

export const useFriendInfo = () => {
    const [friend, setFriend] = useState<SerializedUser>();
    const { chatId } = useParams<{ chatId: string | undefined }>();
    const users = useUsersList();
    const currentUser = auth.currentUser;

    const getOtherParticipant = async () => {
        const chatRef = doc(firestore, 'chats', chatId!);
        const currentChat = (await getDoc(chatRef)).data() as Chat;

        const otherParticipantId = currentChat?.participants.find(id => id !== currentUser?.uid);
        const otherParticipant = users.find(user => user.uid === otherParticipantId);

        setFriend(otherParticipant)
    };

    useEffect(() => {
        if (!currentUser?.uid) return;

        getOtherParticipant();
        
    }, [chatId, friend]);

    return { friend };
}