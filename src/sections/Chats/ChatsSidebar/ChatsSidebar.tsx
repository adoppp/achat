import type { FC, ReactElement } from "react";

import { SidebarContainer } from "@/components/SidebarContainer/SidebarContainer";
import { SidebarHeader } from "@/sections/Chats/ChatsSidebar/SidebarHeader/SidebarHeader";
import { ChatList } from "@/sections/Chats/ChatsSidebar/ChatList/ChatList";
import { Searchbar } from "@/sections/Chats/ChatsSidebar/Searchbar/Searchbar";

export const ChatsSidebar: FC = (): ReactElement => {
    return (
        <SidebarContainer>
            <SidebarHeader />
            <Searchbar />
            <ChatList />
        </SidebarContainer>
    );
};