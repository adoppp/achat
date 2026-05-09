import { Button } from '@/ui/Button/Button';
import classNames from 'classnames/bind';
import type { FC } from 'react';

import styles from '@/components/ErrorWrapper/ErrorWrapper.module.scss';

export interface ErrorWrapperProps {
    title: string | null;
    message: string | null;
    cb?: () => void;
}

const cn = classNames.bind(styles);

export const ErrorWrapper: FC<ErrorWrapperProps> = ({ title, message, cb }) => {
    return (
        <div className={cn('error')}>
            <div className={cn('error__wrapper')}>
                <h2 className={cn('error__title')}>{title}</h2>
                <p className={cn('error__message')}>{message}</p>
                {
                    cb && (
                        <div className={cn('error__button')}>
                            <Button variant="error" onClick={cb}>Ok</Button>
                        </div>
                    )
                }
            </div>
        </div>
    );
};
