import { useState } from "react";

import { UsersList } from "@/sections/Chats/Sidebar/SidebarHeader/UsersList/UsersList";
import { Profile } from "@/sections/Chats/Sidebar/SidebarHeader/Profile/Profile";
import { useAuth } from "@/utils/useAuth";

export const useSidebarHeader = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
    const { user } = useAuth();

    const toggleOpen = () => {
        setIsOpen(!isOpen)
    };

    const toggleIsProfileOpen = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const Modal = isOpen && <UsersList toggleOpen={toggleOpen} />;

    const ProfileModal = isProfileOpen && <Profile toggleOpen={toggleIsProfileOpen} />;

    return { Modal, ProfileModal, toggleOpen, toggleIsProfileOpen, user };
};