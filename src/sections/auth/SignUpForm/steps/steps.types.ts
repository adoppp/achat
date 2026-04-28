import type {
    ErrorState,
    FieldTypes,
    FormState,
    PasswdErrors,
} from '@/sections/auth/SignUpForm/SignUpForm.types';

export type StepProps = {
    formState: FormState;
    errorState: ErrorState;
    passwdErrors: PasswdErrors;
    onChange: (field: FieldTypes) => (value: string) => void;
};

export const STEPS_UI = [
    {
        id: 1,
        title: 'Personal info',
    },
    {
        id: 2,
        title: 'Password',
    },
    {
        id: 3,
        title: 'Verify',
    },
] as const;