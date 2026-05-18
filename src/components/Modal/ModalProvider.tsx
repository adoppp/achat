import { createContext, useContext, useState, type FC, type ReactNode } from 'react';

import type {
    ModalState,
    ModalContextType,
    ModalActionProps,
} from '@/components/Modal/Modal.types';

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [modal, setModal] = useState<ModalState>({ type: null });
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const open = (modal: ModalActionProps): void => {
        setModal(modal);
        setIsOpen(true);
    };

    const close = (): void => {
        setModal({ type: null });
        setIsOpen(false);
    };

    return (
        <ModalContext.Provider
            value={{
                modal: modal,
                isOpen,
                open,
                close,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export const useModalContext = (): ModalContextType | null => {
    const context = useContext(ModalContext);
    if (!context) console.log('You use modal features outside modal provider');
    return context;
};
