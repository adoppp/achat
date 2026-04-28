import type { FC } from 'react';
import { Input } from '@/ui/Input/Input';
import type { StepProps } from '@/sections/auth/SignUpForm/steps/steps.types';

export const StepPersonal: FC<StepProps> = ({ formState, errorState, onChange }) => {
    return (
        <>
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
        </>
    );
};
