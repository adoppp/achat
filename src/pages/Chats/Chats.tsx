import { Suspense, type FC, type ReactElement } from "react";
import { Outlet } from "react-router";
import classNames from "classnames/bind";

import styles from '@/pages/Chats/Chats.module.scss';

import { Loader } from "@/components/Loader/Loader";
import { ChatsSidebar } from "@/sections/Chats/ChatsSidebar/ChatsSidebar";

const cn = classNames.bind(styles);

const Chats: FC = (): ReactElement => {
    return (
        <section className={cn('chats')}>
            <ChatsSidebar />   

            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
        </section>
    );
};

export default Chats;