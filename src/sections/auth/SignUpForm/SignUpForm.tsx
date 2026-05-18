import classNames from 'classnames/bind';
import type { FC } from 'react';

import styles from '@/sections/auth/SignUpForm/SignUpForm.module.scss';
import { Progress } from './Progress/Progress';
import { useSignUpForm } from './SignUpForm.hooks';

const cn = classNames.bind(styles);

export const SignUpForm: FC = () => {
    const {
        formState,
        errorState,
        passwdErrors,
        step,
        maxStep,
        isLoading,
        ActiveStepComponent,
        canGoNext,
        _prev,
        _next,
        handleOnChange,
        handleSubmit,
    } = useSignUpForm();

    return (
        <div className={cn('signup')}>
            <div className={cn('signup__content')}>
                <Progress step={step} />

                <ActiveStepComponent
                    formState={formState}
                    errorState={errorState}
                    passwdErrors={passwdErrors}
                    step={step}
                    maxStep={maxStep}
                    isLoading={isLoading}
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
