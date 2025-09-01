import { SidebarContainer } from "@/components/SidebarContainer/SidebarContainer";
import type { FC, ReactElement } from "react";
import { SidebarHeader } from "../Sidebar/SidebarHeader/SidebarHeader";

export const ChatsSidebar: FC = (): ReactElement => {
    return (
        <SidebarContainer>
            <SidebarHeader />
        </SidebarContainer>
    );
};