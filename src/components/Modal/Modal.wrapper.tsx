import { type FC } from 'react';
import classNames from 'classnames/bind';

import styles from '@/components/Modal/Modal.module.scss';

import { useModalContext } from '@/components/Modal/ModalProvider';
import { ModalRoot } from '@/components/Modal/ModalRoot';
import { IconClose } from '@/assets/svg';
import { ErrorModal } from '@/components/Modal/modals/ErrorModal/ErrorModal';

const cn = classNames.bind(styles);

export const ModalWrapper: FC = () => {
    const modalContext = useModalContext();
    const modalType = modalContext?.modal.type;

    if (modalType === null) return;

    return (
        <ModalRoot>
            <div className={cn('modal')}>
                <div className={cn('modal__box')}>
                    <button onClick={modalContext?.close} className={cn('modal__close')}>
                        {IconClose}
                    </button>
                    {modalType === 'error' && <ErrorModal />}
                </div>
            </div>
        </ModalRoot>
    );
};
