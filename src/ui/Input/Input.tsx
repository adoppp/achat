import { useId, type FC } from 'react';
import classNames from 'classnames/bind';

import styles from '@/ui/Input/Input.module.scss';
import type { InputProps } from '@/ui/Input/Input.types';

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
    onClickleft,
    onClickright,

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
                {leftIcon && <span className={cn('icon__left')} onClick={onClickleft}>{leftIcon}</span>}

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

                {rightIcon && <span className={cn('icon__right')} onClick={onClickright}>{rightIcon}</span>}
            </div>

            {hasError && <span className={cn('input__error', customClass?.error)}>{error}</span>}
        </div>
    );
};