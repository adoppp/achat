import type { StepProps } from '@/sections/auth/SignUpForm/SignUpForm.types';
import { Input } from '@/ui/Input/Input';
import type { FC } from 'react';

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
