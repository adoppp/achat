import { useEffect, useState, type FormEvent } from "react";
import { updateProfile, type User } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

import { firestore } from "@/services"
import { useUserDoc } from "@/utils/useGetDocUser";

interface useProfileSettingsProps {
    currentUser: User | null;
    closeEdit: () => void;
};

export const useProfileSettings = ({ currentUser, closeEdit }: useProfileSettingsProps) => {
    const [name, setName] = useState<string>('');
    const [newBio, setNewBio] = useState<string>('');
    const docUser = useUserDoc();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim() && !newBio.trim()) return;
        if (!currentUser) return;

        const userRef = doc(firestore, 'users', currentUser.uid);

        if (name.trim() !== docUser.displayName && !newBio.trim()) {
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
        } else if (newBio.trim() !== docUser.bio && !name.trim()) {
            try {          
                await updateDoc(userRef, {
                    bio: newBio
                });
        
                setNewBio('');
                closeEdit();
            } catch (e) {
                console.log('ProfileSettings hook: ', e)
            }
        } else {
            try {          
                await updateProfile(currentUser, {
                    displayName: name
                });

                await updateDoc(userRef, {
                    displayName: name,
                    bio: newBio
                });
        
                setNewBio('');
                setName('');
                closeEdit();
            } catch (e) {
                console.log('ProfileSettings hook: ', e)
            }
        }
    };
    
    useEffect(() => {
        if (!docUser) return;

        setName(docUser.displayName ?? '');
        setNewBio(docUser.bio ?? '');
    }, [docUser]);

    return { handleSubmit, name, setName, newBio, setNewBio, docUser };
};