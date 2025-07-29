import { useState } from "react";
import { auth } from "@/services";

import { UserInfoModal } from "@/sections/Chats/Sidebar/UserInfo/UserInfoModal/UserInfoModal";
import { Profile } from "@/sections/Chats/Sidebar/UserInfo/Profile/Profile";

export const useUserInfo = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
    const user = auth.currentUser;

    const toggleOpen = () => {
        setIsOpen(!isOpen)
    };

    const toggleIsSettingsOpen = () => {
        setIsSettingsOpen(!isSettingsOpen);
    };

    const Modal = isOpen && <UserInfoModal toggleOpen={toggleOpen} />;

    const ProfileModal = isSettingsOpen && <Profile toggleOpen={toggleIsSettingsOpen} />;

    return { Modal, ProfileModal, toggleOpen, toggleIsSettingsOpen, user };
};