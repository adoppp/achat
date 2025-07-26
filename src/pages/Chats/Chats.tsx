import { Suspense, type FC, type ReactElement } from "react";
import classNames from "classnames/bind";

import styles from '@/pages/Chats/Chats.module.scss';

import { Button } from "@/ui/Button/Button";
import { signOut } from "firebase/auth";
import { auth } from "@/services";
import { Sidebar } from "@/sections/Chats/Sidebar/Sidebar";
import { Outlet } from "react-router";
import { Loader } from "@/components/Loader/Loader";

const cn = classNames.bind(styles);

const Chats: FC = (): ReactElement => {

    const handleOnClick = async () => {
        await signOut(auth);
    };

    return (
        <div className={cn('chats')}>
            <Sidebar />   
            <div className={cn('time')}>
                Chats
                <Button label="Log out" onClick={handleOnClick} />
                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
            </div>
        </div>
    );
};

export default Chats;