import { auth, firestore } from "@/services"
import { Button } from "@/ui/Button/Button";
import { Input } from "@/ui/Input/Input";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState, type FormEvent } from "react";

export const useProfileSettings = () => {
    const [name, setName] = useState<string>('');
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [aDefault, setADefault] = useState<boolean>(false);
    const [aEdit, setAEdit] = useState<boolean>(false);
    const currentUser = auth.currentUser;

    const toggleEdit = () => {
        setIsEdit(!isEdit)
        setADefault(false);
        setAEdit(false);
    };
    
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
    };

    const UserForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <Input 
                    value={name}
                    onChange={setName}
                    placeholder="New name"
                    id="new-name"
                />
                <Button 
                    label="Submit"
                />
            </form>
        );
    };

    const EditForm = isEdit && <UserForm />

    useEffect(() => {
        const dTimeout = setTimeout(() => setADefault(true), 10);
        const eTimeout = setTimeout(() => setAEdit(true), 10);

        return () => {
            clearTimeout(dTimeout);
            clearTimeout(eTimeout);
        };
    });

    return { currentUser, isEdit, EditForm, toggleEdit, aDefault, aEdit }
};