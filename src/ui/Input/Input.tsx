import type { ChangeEvent, FC, InputHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames/bind';

import styles from '@/ui/Input/Input.module.scss';

interface InputProps {
    id?: string;

    label?: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;

    variant?: 'primary' | 'ghost';
    size?: 's' | 'm' | 'l';
    type?: InputHTMLAttributes<HTMLInputElement>['type'];

    error?: string | null;
    disabled?: boolean;

    leftIcon?: ReactNode;
    rightIcon?: ReactNode;

    autoComplete?: InputHTMLAttributes<HTMLInputElement>['autoComplete'];
    // className?: string;
    customClass?: {
        container?: string;
        label?: string;
        input?: string;
        error?: string;
    };
};

const cn = classNames.bind(styles);

export const Input: FC<InputProps> = ({
    label,
    placeholder,
    value,
    onChange,
    id,

    variant = 'primary',
    size = 'm',
    type = 'text',

    error,
    disabled = false,

    leftIcon,
    rightIcon,

    autoComplete = 'off',
    customClass
}) => {

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => { 
        onChange(e.target.value)
    };

    const hasError = !!error;

    return (
        <div className={cn('input__wrapper', customClass?.container)}>
            {label && <div className={cn('input__label', customClass?.label)}>{label}</div>}

            <label className={cn('input__container')} htmlFor={id}>
                {leftIcon && <span className={cn('icon__left')}>{leftIcon}</span>}

                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleOnChange}
                    disabled={disabled}
                    autoComplete={autoComplete}
                    className={cn('input__element', variant, customClass?.input)}
                />

                {rightIcon && <span className={cn('icon__right')}>{rightIcon}</span>}
            </label>
            
            {hasError && <span className={cn('input__error', customClass?.error)}>{error}</span>}
        </div>
    );
};