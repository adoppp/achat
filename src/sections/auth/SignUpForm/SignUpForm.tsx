import classNames from 'classnames/bind';
import type { FC } from 'react';

import styles from '@/sections/auth/SignUpForm/SignUpForm.module.scss';
import { Progress } from './Progress/Progress';
import { useSignUpForm } from './SignUpForm.hooks';
import { ModalWrapper } from '@/components/ModalWrapper/ModalWrapper';
import { ErrorWrapper } from '@/components/ErrorWrapper/ErrorWrapper';

const cn = classNames.bind(styles);

export const SignUpForm: FC = () => {
    const {
        formState,
        errorState,
        passwdErrors,
        step,
        maxStep,
        isLoading,
        globalError,
        resetError,
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

            <ModalWrapper>
                <ErrorWrapper title='Error title' message='Some message of an error occured' cb={resetError}  />
            </ModalWrapper>

            {globalError.title && globalError.message && (
                <ModalWrapper>
                    <ErrorWrapper title={globalError.title} message={globalError.message} cb={resetError} />
                </ModalWrapper>
            )}
        </div>
    );
};
