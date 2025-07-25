import { useState } from "react";
import { auth } from "@/services";

import { UserInfoModal } from "./UserInfoModal/UserInfoModal";

export const useUserInfo = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const user = auth.currentUser;

    const toggleOpen = () => {
        setIsOpen(!isOpen)
    };

    const Modal = isOpen && <UserInfoModal toggleOpen={toggleOpen} />;
    

    return { Modal, toggleOpen, user };
};