import { useState } from "react";

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

    return { isOpen, toggleOpen, isProfileOpen, toggleIsProfileOpen, user };
};