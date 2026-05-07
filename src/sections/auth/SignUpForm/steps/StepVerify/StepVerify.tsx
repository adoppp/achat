import type { FC } from 'react';
import type { BaseStepProps } from '../../SignUpForm.types';
import { Button } from '@/ui/Button/Button';
import styles from '@/sections/auth/SignUpForm/SignUpForm.module.scss';
import classNames from 'classnames/bind';
import { stepIcons } from '../../SignUpForm.config';

const cn = classNames.bind(styles);

export const StepVerify: FC<BaseStepProps> = ({
    step,
    maxStep,
    _next,
    _prev,
    canGoNext,
}) => {
    return (
        <div className={cn('signup__container')}>
            <div className={cn('signup__description')}>
                <div className={cn('signup__description--icon')}>{stepIcons[step]}</div>
                <h2 className={cn('signup__description--title')}>Type your name and email</h2>
                <p className={cn('signup__description--description')}>All users can see your name and email</p>
            </div>
            
            <div>
                <p>Check your email for verification link</p>
            </div>

            <div className={cn('signup__button')}>
                <Button
                    onClick={_next}
                    disabled={step === maxStep || !canGoNext()}
                >
                    Resend
                </Button>
            </div>
        </div>
    );
};
