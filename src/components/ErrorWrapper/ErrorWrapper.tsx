import { Button } from '@/ui/Button/Button';
import classNames from 'classnames/bind';
import type { FC } from 'react';

import styles from '@/components/ErrorWrapper/ErrorWrapper.module.scss';
import { IconClose } from '@/assets/svg';

export interface ErrorWrapperProps {
    title: string | null;
    message: string | null;
    onTransitionEnd: () => void;
    cb?: () => void;
}

const cn = classNames.bind(styles);

export const ErrorWrapper: FC<ErrorWrapperProps> = ({ title, message, onTransitionEnd, cb }) => {
    return (
        <div className={cn('error')} onTransitionEnd={onTransitionEnd} role="alertdialog" aria-modal="true">
            <div className={cn('error__wrapper')}>
                <span className={cn('error__icon')}>{IconClose}</span>
                <h2 className={cn('error__title')}>{title}</h2>
                <p className={cn('error__message')}>{message}</p>
                {cb && (
                    <div className={cn('error__button')}>
                        <Button variant="error" onClick={cb}>
                            Ok
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
