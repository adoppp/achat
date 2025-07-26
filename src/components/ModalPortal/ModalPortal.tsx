import type { FC, ReactNode } from "react"
import { createPortal } from "react-dom";
import classNames from "classnames/bind";

import styles from '@/components/ModalPortal/ModalPortal.module.scss';

interface ModalPortalProps {
    children: ReactNode;
};

const cn = classNames.bind(styles);

export const ModalPortal: FC<ModalPortalProps> = ({ children }) => {
    return createPortal(
        <div className={cn('modal')}>
            <section className={cn('modal__container')}>
                {children}
            </section>
        </div>,
        document.body
    );
};