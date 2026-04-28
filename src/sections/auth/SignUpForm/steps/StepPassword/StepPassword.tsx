import type { PasswdErrors, StepProps } from '@/sections/auth/SignUpForm/SignUpForm.types';
import { Input } from '@/ui/Input/Input';
import type { FC, ReactNode } from 'react';

const passwordErrorMessages: Record<keyof PasswdErrors, string> = {
    isEightCharacters: 'At least 8 characters',
    isOneUppercase: 'At least one uppercase letter',
    isOneLowercase: 'At least one lowercase letter',
    isOneNumber: 'At least one number',
    isOneSpecialSymbol: 'At least one special symbol',
};

export const StepPassword: FC<StepProps> = ({ formState, passwdErrors, onChange }) => {
    const items: ReactNode = Object.entries(passwdErrors).map(([key, isValid]) => {
        const typedKey = key as keyof PasswdErrors;

        return (
            <li key={key}>
                {isValid ? '✔' : '✖'} {passwordErrorMessages[typedKey]}
            </li>
        );
    });

    return (
        <>
            <Input
                label="Password"
                type="password"
                value={formState.password}
                onChange={onChange('password')}
            />

            <ul>{items}</ul>
        </>
    );
};
