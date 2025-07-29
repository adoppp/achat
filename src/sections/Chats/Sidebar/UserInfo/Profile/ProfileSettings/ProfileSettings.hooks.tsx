import { useState, type FormEvent } from "react";
import { updateProfile, type User } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

import { firestore } from "@/services"

interface useProfileSettingsProps {
    currentUser: User | null;
    closeEdit: () => void;
};

export const useProfileSettings = ({ currentUser, closeEdit }: useProfileSettingsProps) => {
    const [name, setName] = useState<string>('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim()) return;
        if (!currentUser) return;

        const userRef = doc(firestore, 'users', currentUser.uid);

        await updateProfile(currentUser, {
            displayName: name
        });

        await updateDoc(userRef, {
            displayName: name
        });

        setName('');
        closeEdit();
    };

    return { handleSubmit, name, setName, currentUser };
};