import { useState, type FC, type FormEvent, type ReactNode } from "react"

import { Input } from "@/ui/Input/Input"
import { MessagesList } from "@/sections/Chats/ChatMessages/MessagesList/MessagesList"
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, firestore } from "@/services";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router";
import { signOut } from "firebase/auth";
import { FriendInfo } from "./FriendInfo/FriendInfo";

export const ChatMessages: FC = (): ReactNode => {
    const { chatId } = useParams<{ chatId: string }>();
    const [message, setMessage] = useState<string>('');
    const [user] = useAuthState(auth);

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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
            }
        });

        setMessage('');
    };

    const handleLogOut = async () => {
        await signOut(auth);
    }

  return (
        <section>
            <FriendInfo />
            <button onClick={handleLogOut}>logout</button>
            <MessagesList />
            <form onSubmit={sendMessage}>
                <Input 
                    value={message}
                    onChange={setMessage}
                    placeholder="Type your message..."
                    id="message"
                />
            </form>
        </section>
  )
}
