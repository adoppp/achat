import { type FC, type ReactNode } from "react"

import { MessagesList } from "@/sections/Chats/ChatMessages/MessagesList/MessagesList"
import { FriendInfo } from "@/sections/Chats/ChatMessages/FriendInfo/FriendInfo";
import { InputMessage } from "@/sections/Chats/ChatMessages/InputMessage/InputMessage";
import { useChatMessages } from "@/sections/Chats/ChatMessages/ChatMessages.hooks";

export const ChatMessages: FC = (): ReactNode => {
    const { message, setMessage, sendMessage } = useChatMessages();

    return (
        <>
            <div>  
                <FriendInfo />
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
