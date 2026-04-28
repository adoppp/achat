export interface FormState {
    username: string;
    email: string;
    password: string;
}

export type FieldTypes = keyof FormState;

export interface ErrorState {
    username: string | null;
    email: string | null;
}

export type ErrorFields = keyof ErrorState;

export interface PasswdErrors {
    isEightCharacters: boolean;
    isOneUppercase: boolean;
    isOneLowercase: boolean;
    isOneNumber: boolean;
    isOneSpecialSymbol: boolean;
}

export type StepId = 1 | 2 | 3;

export type StepProps = {
    formState: FormState;
    errorState: ErrorState;
    passwdErrors: PasswdErrors;
    onChange: (field: FieldTypes) => (value: string) => void;
};

export type StepMeta = {
    id: StepId;
    title: string;
};

export const STEPS_UI: readonly StepMeta[] = [
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
