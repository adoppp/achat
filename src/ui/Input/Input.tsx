import { useId, type FC, type InputHTMLAttributes, type ReactNode } from 'react';
import classNames from 'classnames/bind';

import styles from '@/ui/Input/Input.module.scss';

interface InputProps {
    id?: string;

    label?: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;

    size?: 's' | 'm' | 'l';
    type?: InputHTMLAttributes<HTMLInputElement>['type'];

    error?: string | null;
    disabled?: boolean;

    leftIcon?: ReactNode;
    rightIcon?: ReactNode;

    autoComplete?: InputHTMLAttributes<HTMLInputElement>['autoComplete'];
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

    size = 'm',
    type = 'text',

    error,
    disabled = false,

    leftIcon,
    rightIcon,

    autoComplete = 'off',
    customClass
}) => {

    const inputId = id || useId();
    const hasError = !!error;

    return (
        <div
            className={cn(
                'input',
                `input--${size}`,
                hasError && 'input--error',
                customClass?.container,
            )}
        >
            {label && (
                <label htmlFor={inputId} className={cn('input__label', customClass?.label)}>
                    {label}
                </label>
            )}

            <div className={cn('input__container')} >
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
            </div>

            {hasError && <span className={cn('input__error', customClass?.error)}>{error}</span>}
        </div>
    );
};