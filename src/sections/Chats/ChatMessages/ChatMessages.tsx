import { useEffect, useState, type FC, type FormEvent, type ReactNode } from "react"

import { MessagesList } from "@/sections/Chats/ChatMessages/MessagesList/MessagesList"
import { addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, firestore } from "@/services";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router";
import { signOut } from "firebase/auth";
import { FriendInfo } from "./FriendInfo/FriendInfo";
import { InputMessage } from "./InputMessage/InputMessage";

export const ChatMessages: FC = (): ReactNode => {
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

    // const handleLogOut = async () => {
    //     await signOut(auth);
    // };

  return (
        <>
            <div>  
                <FriendInfo />
                {/* <button onClick={handleLogOut}>logout</button> */}
                <MessagesList />
            </div>
            <form onSubmit={sendMessage}>
                <InputMessage 
                    value={message}
                    onChange={setMessage}
                    placeholder="Message"
                    id="message"
                />
            </form>
        </>
  )
}
