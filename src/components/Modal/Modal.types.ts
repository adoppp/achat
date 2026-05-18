import type { ReactNode } from 'react';

export type ModalType = 'info' | 'success' | 'error' | null;

export type ModalActionsType = Exclude<ModalType, null>;

export interface ModalProps {
    icon?: ReactNode;
    title: string;
    message: string;
}

export interface ModalState {
    type: ModalType;
    modalProps?: ModalProps;
}

export interface ModalActionProps {
    type: ModalActionsType;
    modalProps?: ModalProps;
}

export interface ModalContextType {
    modal: ModalState;
    isOpen: boolean;
    open: (modal: ModalActionProps) => void;
    close: () => void;
}
