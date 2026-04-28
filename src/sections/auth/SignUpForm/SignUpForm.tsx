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
        StepComponent,
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

                <div className={'signup__description'}>
                    <div className={'signup__description--container'}>icon</div>
                    <h2 className={'signup__description--title'}>todo for user</h2>
                    <p className={'signup__description--description'}>description</p>
                </div>

                <div className={'signup__content'}>
                    <form className={'signup__form'}>
                        <StepComponent
                            formState={formState}
                            errorState={errorState}
                            passwdErrors={passwdErrors}
                            onChange={handleOnChange}
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
            </div>
        </div>
    );
};