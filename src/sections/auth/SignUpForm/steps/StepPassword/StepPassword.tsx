import type { PasswdErrors, StepPasswordProps } from '@/sections/auth/SignUpForm/SignUpForm.types';
import styles from '@/sections/auth/SignUpForm/SignUpForm.module.scss';
import { Input } from '@/ui/Input/Input';
import { InputPassword } from '@/ui/InputPassword/InputPassword';
import classNames from 'classnames/bind';
import type { FC, ReactNode } from 'react';
import { Button } from '@/ui/Button/Button';

const passwordErrorMessages: Record<keyof PasswdErrors, string> = {
    isEightCharacters: 'At least 8 characters',
    isOneUppercase: 'At least one uppercase letter',
    isOneLowercase: 'At least one lowercase letter',
    isOneNumber: 'At least one number',
    isOneSpecialSymbol: 'At least one special symbol',
};

const cn = classNames.bind(styles);

export const StepPassword: FC<StepPasswordProps> = ({ 
    formState,
    passwdErrors,
    step,
    maxStep,
    _next,
    _prev,
    canGoNext,
    onChange,
    onSubmit,
 }) => {
    const items: ReactNode = Object.entries(passwdErrors).map(([key, isValid]) => {
        const typedKey = key as keyof PasswdErrors;

        return (
            <li key={key}>
                {isValid ? '✔' : '✖'} {passwordErrorMessages[typedKey]}
            </li>
        );
    });

    return (
        <>
            <div className={cn('signup__description')}>
                <div className={cn('signup__description--container')}>icon</div>
                <h2 className={cn('signup__description--title')}>todo for user</h2>
                <p className={cn('signup__description--description')}>description</p>
            </div>

            <div className={cn('signup__content')}>
                <form className={cn('signup__form')} onSubmit={onSubmit}>
                    <InputPassword
                        label="Password"
                        value={formState.password}
                        onChange={onChange('password')}
                    />
                </form>
                <ul>{items}</ul>
            </div>

            <div className={cn('signup__button')}>
                <Button size="s" onClick={_prev} disabled={step === 1}>
                    Previous
                </Button>
                <Button
                    size="s"
                    variant="secondary"
                    onClick={_next}
                    disabled={step === maxStep || !canGoNext()}
                >
                    Next step
                </Button>
            </div>
        </>
    );
};
