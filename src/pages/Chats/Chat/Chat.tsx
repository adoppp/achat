import type { FC, ReactElement } from "react";
import classNames from "classnames/bind";

import styles from '@/pages/Chats/Chat/Chat.module.scss';

import { ChatMessages } from "@/sections/Chats/ChatMessages/ChatMessages";

const cn = classNames.bind(styles);

const Chat: FC = (): ReactElement => {
  return (
    <section className={cn('chat')}>
        <ChatMessages />
    </section>
  );
};

export default Chat