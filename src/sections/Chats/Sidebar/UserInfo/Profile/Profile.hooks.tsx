import { useState } from "react";

import { auth } from "@/services"

export const useProfile = () => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [animation, setAnimation] = useState<'anim__open' | 'anim__close'>('anim__open');
    const currentUser = auth.currentUser;

    const openEdit = () => {
        setIsEdit(true);
        setAnimation('anim__open');
    };

    const closeEdit = () => {
        setAnimation('anim__close');

        setTimeout(() => {
            setIsEdit(false);
        }, 500);
    };

    return { currentUser, isEdit, openEdit, closeEdit, animation };
};