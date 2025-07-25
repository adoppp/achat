import { useEffect, useState } from "react";
import { auth, firestore } from "@/services";
import classNames from "classnames/bind";
import { collection, getDocs } from 'firebase/firestore'

import styles from '@/sections/Chats/Sidebar/UserInfo/UserInfo.module.scss';
import { ModalPortal } from "@/components/ModalPortal/ModalPortal";

const cn = classNames.bind(styles);

export const useUserInfo = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const usersRef = collection(firestore, 'users');
    const user = auth.currentUser;

    const toggleOpen = () => {
        setIsOpen(!isOpen)
    };

    const searchUsers = () => {

    }

    const getUsers = async () => {
        const users = await getDocs(usersRef);
        const clearedData = users.docs.map(user => ({...user.data()}))

        console.log(clearedData)
    };

    useEffect(() => {
        getUsers();
    }, [])

    const Modal = isOpen && 
        <ModalPortal>
            <section className={cn('modal')}>
                <button onClick={toggleOpen}>x</button>
                <div className={cn('modal__content')}>
                    <input placeholder="search user" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <ul>
                        {}
                    </ul>
                </div>
            </section>
        </ModalPortal>;
    

    return { Modal, toggleOpen, user };
};