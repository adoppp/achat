import type { FC } from "react";
import classNames from "classnames/bind";

import styles from '@/pages/Chats/ChatIndex/ChatIndex.module.scss';

const cn = classNames.bind(styles);

const ChatIndex: FC = () => {
    return (
        <div className={cn("chatindex")}>
            <h1>
                Start messaging
            </h1>
            <p>
                Choose chat or find your friend 
            </p>
        </div>
    );
};

export default ChatIndex;