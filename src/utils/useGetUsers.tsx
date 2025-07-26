import { firestore } from "@/services";
import type { SerializedUser } from "@/types";
import { collection, getDocs } from "firebase/firestore";

interface useGetUsersProps {
    setUsers: (users: SerializedUser[]) => void;
};

export const getUsers = async ({ setUsers }: useGetUsersProps) => {
    const usersRef = collection(firestore, 'users');
    const users = await getDocs(usersRef);
    const clearedData = users.docs.map(user => ({...user.data()}));

    setUsers(clearedData as SerializedUser[]);
};