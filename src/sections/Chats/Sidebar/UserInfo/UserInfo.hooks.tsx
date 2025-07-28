import { useState } from "react";
import { auth } from "@/services";

import { UserInfoModal } from "@/sections/Chats/Sidebar/UserInfo/UserInfoModal/UserInfoModal";
import { ProfileSettings } from "@/sections/Chats/Sidebar/UserInfo/ProfileSettings/ProfileSettings";

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

    const Profile = isSettingsOpen && <ProfileSettings toggleOpen={toggleIsSettingsOpen} />;

    return { Modal, Profile, toggleOpen, toggleIsSettingsOpen, user };
};