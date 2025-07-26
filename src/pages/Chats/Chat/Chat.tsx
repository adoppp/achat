import { useParams } from "react-router";

function Chat() {
    const {chatId} = useParams<{ chatId: string }>();

  return (
    <div>{chatId}</div>
  );
};

export default Chat