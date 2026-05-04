import type { FC } from "react";
import classNames from "classnames/bind";

import styles from '@/sections/auth/SignUpForm/SignUpForm.module.scss';
import { useSignUpForm } from './SignUpForm.hooks';
import { IconCheckMark } from '@/assets/svg';
import { Button } from '@/ui/Button/Button';
import { Progress } from './Progress/Progress';

const cn = classNames.bind(styles);

export const SignUpForm: FC = () => {
    const { 
        formState, 
        errorState, 
        passwdErrors, 
        step, 
        maxStep,
        ActiveStepComponent,
        canGoNext,
        _prev, 
        _next, 
        handleOnChange, 
        handleSubmit
    } = useSignUpForm();
    
    return (
        <div className={cn('signup')}>
            <div className={cn('signup__content')}>
                <div className={cn('signup__progress')}>
                    <Progress step={step} />
                </div>

                <ActiveStepComponent
                    formState={formState}
                    errorState={errorState}
                    passwdErrors={passwdErrors}
                    step={step}
                    maxStep={maxStep}
                    _next={_next}
                    _prev={_prev}
                    canGoNext={canGoNext}
                    onChange={handleOnChange}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};