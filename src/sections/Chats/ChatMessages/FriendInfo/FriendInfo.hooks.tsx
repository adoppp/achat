import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { doc, getDoc } from "firebase/firestore";

import { firestore } from "@/services";
import type { Chat, SerializedUser } from "@/types";
import { useUsers } from "@/utils/useUsers";
import { useAuth } from "@/utils/useAuth";
import { InfoModal } from "@/sections/Chats/ChatMessages/FriendInfo/InfoModal/InfoModal";

export const useFriendInfo = () => {
    const [friend, setFriend] = useState<SerializedUser>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>();
    const { chatId } = useParams<{ chatId: string | undefined }>();
    const { user: currentUser } = useAuth();
    const users = useUsers();

    const getOtherParticipant = async () => {
        const chatRef = doc(firestore, 'chats', chatId!);
        const currentChat = (await getDoc(chatRef)).data() as Chat;

        const otherParticipantId = currentChat?.participants.find(id => id !== currentUser?.uid);
        const otherParticipant = users.find(user => user.uid === otherParticipantId);

        setFriend(otherParticipant);
    };

    const toggleOpen = () => setIsModalOpen(!isModalOpen);

    const Modal = isModalOpen && 
        friend && 
        <InfoModal 
            displayName={friend.displayName} 
            photoURL={friend.photoURL}
            email={friend.email}
            bio={friend.bio}
            toggleOpen={toggleOpen} 
        />;

    useEffect(() => {
        if (!currentUser?.uid) return;

        getOtherParticipant();
        
    }, [chatId, friend]);

    return { friend, Modal, toggleOpen };
}