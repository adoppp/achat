import { ChatMessages } from "@/sections/Chats/ChatMessages/ChatMessages";
import { useParams } from "react-router";

function Chat() {
    const { chatId } = useParams<{ chatId: string }>();

  return (
    <div>
        <ChatMessages />
    </div>
  );
};

export default Chat