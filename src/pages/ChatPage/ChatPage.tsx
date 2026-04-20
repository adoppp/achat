import type { FC } from 'react';
import { useParams } from 'react-router';

const ChatPage: FC = () => {
    const { chatId } = useParams();

    return (
        <div>
            Chat id:
            <b>{chatId}</b>
        </div>
    );
};

export default ChatPage;
