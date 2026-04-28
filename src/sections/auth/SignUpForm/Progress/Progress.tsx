import classNames from 'classnames/bind';
import type { FC } from 'react';

import { IconCheckMark } from '@/assets/svg';
import type { Step } from '@/sections/auth/SignUpForm/SignUpForm.config';
import styles from '@/sections/auth/SignUpForm/SignUpForm.module.scss';
import { STEPS_UI } from '@/sections/auth/SignUpForm/SignUpForm.types';

interface ProgressProps {
    step: Step;
}

const cn = classNames.bind(styles);

export const Progress: FC<ProgressProps> = ({ step }) => {
    const items = STEPS_UI.map((s) => {
        const isActive = step === s.id;
        const isDone = step > s.id;

        return (
            <li
                key={s.id}
                className={cn(
                    'signup__progress--item',
                    isActive && 'step__active',
                    isDone && 'step__done',
                )}
            >
                <span className={cn('signup__progress--box')}>
                        <span className={cn('signup__progress--number')}>{s.id}</span>
                        {IconCheckMark}
                </span>

                <span className={cn('signup__progress--title')}>{s.title}</span>
            </li>
        );
    });

    return <ul className={cn('signup__progress--list')}>{items}</ul>;
};
