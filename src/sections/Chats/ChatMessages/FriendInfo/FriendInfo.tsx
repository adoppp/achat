import { useEffect, useState, type FC, type ReactNode } from "react";
import { useParams } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import Avatar from 'react-avatar';
import classNames from "classnames/bind";

import styles from '@/sections/Chats/ChatMessages/FriendInfo/FriendInfo.module.scss';

import { auth, firestore } from "@/services";
import type { Chat, SerializedUser } from "@/types";
import { useUsersList } from "@/utils/useUsersList";

const cn = classNames.bind(styles);

export const FriendInfo: FC = (): ReactNode => {
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

    return (
        <section className={cn('friend')}>
            {
                friend?.photoURL ? 
                <img 
                    src={friend?.photoURL} 
                    alt={friend?.displayName ?? 'Not found'} 
                /> :
                <Avatar name={friend?.displayName as string} size="44" round  />
            }
            <h3>
                {friend?.displayName}
            </h3>
        </section>
    );
};
