import type { StepFormProps } from '@/sections/auth/SignUpForm/SignUpForm.types';
import { Input } from '@/ui/Input/Input';
import type { FC } from 'react';
import styles from '@/sections/auth/SignUpForm/SignUpForm.module.scss';
import classNames from 'classnames/bind';
import { Button } from '@/ui/Button/Button';

const cn = classNames.bind(styles);

export const StepPersonal: FC<StepFormProps> = ({ 
    formState, 
    errorState, 
    step,
    maxStep,
    _next,
    _prev,
    canGoNext,
    onChange
}) => {
    return (
        <>
            <div className={cn('signup__description')}>
                <div className={cn('signup__description--container')}>icon</div>
                <h2 className={cn('signup__description--title')}>todo for user</h2>
                <p className={cn('signup__description--description')}>description</p>
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
                        value={formState.email}
                        onChange={onChange('email')}
                        error={errorState.email}
                    />
                </form>
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
