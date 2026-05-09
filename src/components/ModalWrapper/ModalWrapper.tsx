import type { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalWrapperProps {
    children: ReactNode;
}

export const ModalWrapper: FC<ModalWrapperProps> = ({ children }) => {
    return createPortal(children, document.body);
};
