import type { FC, ReactNode } from 'react';
import { Input } from '@/ui/Input/Input';
import type {
    PasswdErrors,
} from '@/sections/auth/SignUpForm/SignUpForm.types';
import type { StepProps } from '@/sections/auth/SignUpForm/steps/steps.types';

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
