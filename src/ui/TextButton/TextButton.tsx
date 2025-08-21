import { type ButtonHTMLAttributes, type FC, type JSX, type ReactElement } from 'react';
import classNames from 'classnames/bind';

import styles from '@/ui/TextButton/TextButton.module.scss';

interface TextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    iconLeft?:  JSX.Element;
    iconRight?:  JSX.Element;
};

const cn = classNames.bind(styles);

export const TextButton: FC<TextButtonProps> = ({ label, iconLeft, iconRight, ...props }): ReactElement => {
    return (
        <button className={cn('button')} {...props}>
            {iconLeft}
            <span>
                {label}  
            </span>
            {iconRight}
        </button>
    );
};
