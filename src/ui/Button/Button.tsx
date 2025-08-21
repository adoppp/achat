import { type ButtonHTMLAttributes, type FC, type ReactElement } from 'react';
import classNames from 'classnames/bind';

import styles from '@/ui/Button/Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    customClass: string;
};

const cn = classNames.bind(styles);

export const Button: FC<ButtonProps> = ({ label, customClass, ...props }): ReactElement => {
    return (
        <button className={cn('button', customClass)} {...props}>
            {label}  
        </button>
    );
};
