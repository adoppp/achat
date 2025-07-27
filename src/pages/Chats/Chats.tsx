import { Suspense, type FC, type ReactElement } from "react";
import classNames from "classnames/bind";

import styles from '@/pages/Chats/Chats.module.scss';

import { Sidebar } from "@/sections/Chats/Sidebar/Sidebar";
import { Outlet } from "react-router";
import { Loader } from "@/components/Loader/Loader";

const cn = classNames.bind(styles);

const Chats: FC = (): ReactElement => {
    return (
        <section className={cn('chats')}>
            <Sidebar />   

            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
        </section>
    );
};

export default Chats;