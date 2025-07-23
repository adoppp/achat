import { type ButtonHTMLAttributes, type FC, type ReactElement } from 'react';
import classNames from 'classnames/bind';

import styles from '@/ui/Button/Buttom.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
};

const cn = classNames.bind(styles);

export const Button: FC<ButtonProps> = ({ label, ...props }): ReactElement => {
    return (
        <button className={cn('button')} {...props}>
            {label}  
        </button>
    );
};
