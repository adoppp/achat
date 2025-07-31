import { useState } from "react";

import { useAuth } from "@/utils/useAuth";
import { useUserDoc } from "@/utils/useGetDocUser";

export const useProfile = () => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [animation, setAnimation] = useState<'anim__open' | 'anim__close'>('anim__open');
    const { user } = useAuth();
    const docUser = useUserDoc();

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

    return { user, isEdit, openEdit, closeEdit, animation, docUser };
};