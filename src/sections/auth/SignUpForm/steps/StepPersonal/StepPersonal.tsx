import type { StepFormProps } from '@/sections/auth/SignUpForm/SignUpForm.types';
import { Input } from '@/ui/Input/Input';
import type { FC } from 'react';
import styles from '@/sections/auth/SignUpForm/SignUpForm.module.scss';
import classNames from 'classnames/bind';
import { Button } from '@/ui/Button/Button';
import { stepIcons } from '../../SignUpForm.config';

const cn = classNames.bind(styles);

export const StepPersonal: FC<StepFormProps> = ({ 
    formState, 
    errorState, 
    step,
    maxStep,
    _next,
    canGoNext,
    onChange
}) => {
    return (
        <div className={cn('signup__container')}>
            <div className={cn('signup__description')}>
                <div className={cn('signup__description--icon')}>{stepIcons[step]}</div>
                <h2 className={cn('signup__description--title')}>Type your name and email</h2>
                <p className={cn('signup__description--description')}>All users can see your name and email</p>
            </div>

            <div className={cn('signup__content')}>
                <form className={cn('signup__form')}>
                    <Input
                        label="Username"
                        value={formState.username}
                        onChange={onChange('username')}
                        error={errorState.username}
                    />

                    <Input
                        label="Email"
                        type='email'
                        value={formState.email}
                        onChange={onChange('email')}
                        error={errorState.email}
                    />
                </form>
            </div>

            <div className={cn('signup__button', 'personal__button')}>
                <Button
                    onClick={_next}
                    disabled={step === maxStep || !canGoNext()}
                >
                    Next step
                </Button>
            </div>
        </div>
    );
};
