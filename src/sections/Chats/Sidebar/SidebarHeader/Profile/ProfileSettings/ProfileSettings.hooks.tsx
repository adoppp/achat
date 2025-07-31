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
    const [newBio, setNewBio] = useState<string>('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim() && !newBio.trim()) return;
        if (!currentUser) return;

        const userRef = doc(firestore, 'users', currentUser.uid);

        if (name.trim()) {
            try {
                await updateProfile(currentUser, {
                    displayName: name
                });
        
                await updateDoc(userRef, {
                    displayName: name,
                });
        
                setName('');
                closeEdit();
            } catch (e) {
                console.log('ProfileSettings hook: ', e)
            }
        } else if (newBio.trim()) {
            try {          
                await updateDoc(userRef, {
                    bio: newBio
                });
        
                setNewBio('');
                closeEdit();
            } catch (e) {
                console.log('ProfileSettings hook: ', e)
            }
        }
    };

    return { handleSubmit, name, setName, newBio, setNewBio };
};