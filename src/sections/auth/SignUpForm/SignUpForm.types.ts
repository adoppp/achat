import type { FormEvent } from 'react';
import type { Step } from './SignUpForm.config';

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

export interface IsPasswordValid {
    isEightCharacters: boolean;
    isOneUppercase: boolean;
    isOneLowercase: boolean;
    isOneNumber: boolean;
    isOneSpecialSymbol: boolean;
}

export type BaseStepProps = {
    step: Step;
    maxStep: number;
    _next: () => void;
    _prev: () => void;
    canGoNext: () => boolean;
};

export type BaseStepFormProps = BaseStepProps & {
    formState: FormState;
    onChange: (field: FieldTypes) => (value: string) => void;
};

export type StepFormProps = BaseStepFormProps & {
    errorState: ErrorState;
};

export type StepPasswordProps = BaseStepFormProps & {
    passwdErrors: IsPasswordValid;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
};

export type StepMeta = {
    id: Step;
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
