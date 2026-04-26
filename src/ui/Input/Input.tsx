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

    const inputId = id || `input-${Math.random()}`;
    const hasError = !!error;

    return (
        <div
            className={cn(
                'input',
                `input--${size}`,
                `input--${variant}`,
                hasError && 'input--error',
                customClass?.container,
            )}
        >
            {label && (
                <span className={cn('input__label', customClass?.label)}>
                    {label}
                </span>
            )}

            <label className={cn('input__container')} htmlFor={inputId}>
                {leftIcon && <span className={cn('icon__left')}>{leftIcon}</span>}

                <input
                    id={inputId}
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    disabled={disabled}
                    autoComplete={autoComplete}
                    aria-invalid={hasError}
                    className={cn('input__element', customClass?.input)}
                />

                {rightIcon && <span className={cn('icon__right')}>{rightIcon}</span>}
            </label>

            {hasError && <span className={cn('input__error', customClass?.error)}>{error}</span>}
        </div>
    );
};