import type { IsPasswordValid, StepPasswordProps } from '@/sections/auth/SignUpForm/SignUpForm.types';
import styles from '@/sections/auth/SignUpForm/SignUpForm.module.scss';
import { InputPassword } from '@/ui/InputPassword/InputPassword';
import classNames from 'classnames/bind';
import { useId, type FC, type ReactNode } from 'react';
import { Button } from '@/ui/Button/Button';
import { stepIcons } from '../../SignUpForm.config';
import { IconCheckMark, IconClose } from '@/assets/svg';
import { Loader } from '@/components/Loader/Loader';

const passwordErrorMessages: Record<keyof IsPasswordValid, string> = {
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
    isLoading,
    _prev,
    canGoNext,
    onChange,
    onSubmit,
 }) => {
    const formId = useId();
    const hasErrors = Object.values(passwdErrors).some(value => value === false);
    const items: ReactNode = Object.entries(passwdErrors).map(([key, isValid]) => {
        const typedKey = key as keyof IsPasswordValid;

        return (
            <li key={key} className={cn('password__item', isValid && 'password__item--valid')}>
                <span className={cn('password__item--icon')}>

                    {isValid ? IconCheckMark : IconClose} 
                </span>
                <span className={cn('password__item--rule')}>{passwordErrorMessages[typedKey]}</span>
            </li>
        );
    });

    return (
        <div className={cn('signup__container')}>
            {
                isLoading ? (
                    <div className={cn('signup__loader')}>
                        <Loader />
                    </div>
                ) : (
                    <>
                        <div className={cn('signup__description')}>
                            <div className={cn('signup__description--icon')}>{stepIcons[step]}</div>
                            <h2 className={cn('signup__description--title')}>Create a password</h2>
                            <p className={cn('signup__description--description')}>Choose a strong password to secure your account</p>
                        </div>

                        <div className={cn('signup__content')}>
                            <form className={cn('signup__form')} id={formId} onSubmit={onSubmit}>
                                <InputPassword
                                    label="Password"
                                    value={formState.password}
                                    onChange={onChange('password')}
                                    error={hasErrors ? 'Invalid password' : null}
                                />
                            </form>
                            <ul className={cn('password__list')}>{items}</ul>
                        </div>

                        <div className={cn('signup__button')}>
                            <Button variant="secondary" onClick={_prev} disabled={step === 1}>
                                Previous
                            </Button>
                            <Button
                                form={formId}
                                type='submit'
                                disabled={step === maxStep || !canGoNext()}
                            >
                                Submit
                            </Button>
                        </div>
                    </>
                )
            }
        </div>
    );
};
