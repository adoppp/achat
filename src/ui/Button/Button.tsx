import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import classNames from 'classnames/bind';

import styles from '@/ui/Button/Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    size?: 's' | 'm' | 'l';
    customClassName?: string;

    isLoading?: boolean;
    isDisabled?: boolean;

    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

const cn = classNames.bind(styles);

export const Button: FC<ButtonProps> = ({
    variant = 'primary',
    size = 'm',
    customClassName,
    isLoading = false,
    isDisabled = false,
    leftIcon,
    rightIcon,
    children,
    ...props
}) => {
    const isButtonDisabled = isDisabled || isLoading;

    return (
        <button
            className={cn(
                'default', 
                variant, 
                `button--${size}`, 
                customClassName
            )}
            data-loading={isLoading || undefined}
            disabled={isButtonDisabled}
            {...props}
        >
            <span className={cn('content', isLoading && 'hidden')}>
                {leftIcon}
                {children}
                {rightIcon}
            </span>

            {isLoading && <span className={cn('loader')} />}
        </button>
    );
};
