import type { FC } from 'react';
import type { BaseStepProps } from '../../SignUpForm.types';
import { Button } from '@/ui/Button/Button';
import styles from '@/sections/auth/SignUpForm/SignUpForm.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

export const StepVerify: FC<BaseStepProps> = ({
    step,
    maxStep,
    _next,
    _prev,
    canGoNext,
}) => {
    return (
        <>
            <div>
                <p>Check your email for verification link</p>
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
