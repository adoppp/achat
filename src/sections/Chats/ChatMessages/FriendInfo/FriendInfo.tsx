import { auth, firestore } from "@/services";
import type { Chat, SerializedUser } from "@/types";
import { useUsersList } from "@/utils/useUsersList";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState, type FC, type ReactNode } from "react";
import { useParams } from "react-router";

export const FriendInfo: FC = (): ReactNode => {
    const [friend, setFriend] = useState<SerializedUser>();
    const { chatId } = useParams<{ chatId: string | undefined }>();
    const users = useUsersList();
    const currentUser = auth.currentUser;
    const chatRef = doc(firestore, 'chats', chatId!);

    const getOtherParticipant = async () => {
        const currentChat = (await getDoc(chatRef)).data() as Chat;

        const otherParticipantId = currentChat?.participants.find(id => id !== currentUser?.uid);
        const otherParticipant = users.find(user => user.uid === otherParticipantId);

        setFriend(otherParticipant)
    };

    useEffect(() => {
        if (!currentUser?.uid) return;

        getOtherParticipant();
        
    }, [chatId, friend]);

    return (
        <div>{friend?.displayName} gggg</div>
    );
};
