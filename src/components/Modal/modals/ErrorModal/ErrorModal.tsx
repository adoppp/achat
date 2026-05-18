import type { FC } from 'react';
import classNames from 'classnames/bind';

import styles from '@/components/Modal/modals/ErrorModal/ErrorModal.module.scss';

import { IconClose } from '@/assets/svg';
import { useModalContext } from '@/components/Modal/ModalProvider';
import { Button } from '@/ui/Button/Button';

const cn = classNames.bind(styles);

export const ErrorModal: FC = () => {
    const modalContext = useModalContext();

    if (!modalContext) {
        return <div>Can not Load modal Context</div>;
    }

    return (
        <>
            <span className={cn('error__icon')}>{IconClose}</span>
            <h2 className={cn('error__title')}>{modalContext.modal.modalProps?.title}</h2>
            <p className={cn('error__message')}>{modalContext.modal.modalProps?.message}</p>
            <div className={cn('error__button')}>
                <Button variant="error" onClick={modalContext.close}>
                    Ok
                </Button>
            </div>
        </>
    );
};
