import { useState, type FormEvent } from 'react';
import { STEPS, stepsMap, type Step } from './SignUpForm.config';
import type {
    ErrorFields,
    ErrorState,
    FieldTypes,
    FormState,
    PasswdErrors,
} from './SignUpForm.types';

const initialFormState: FormState = {
    username: '',
    email: '',
    password: '',
};

const initialErrorsState: ErrorState = {
    username: null,
    email: null,
};

const initialPasswdErrors: PasswdErrors = {
    isEightCharacters: false,
    isOneUppercase: false,
    isOneLowercase: false,
    isOneNumber: false,
    isOneSpecialSymbol: false,
};

export const useSignUpForm = () => {
    const [formState, setFormState] = useState<FormState>(initialFormState);
    const [errorState, setErrorState] = useState<ErrorState>(initialErrorsState);
    const [passwdErrors, setPasswdErrors] = useState<PasswdErrors>(initialPasswdErrors);
    const [step, setStep] = useState<Step>(1);
    const maxStep = STEPS.length;
    const StepComponent = stepsMap[step];

    const _prev = () => setStep((s) => Math.max(1, s - 1) as Step);

    const _next = () => {
        if (!canGoNext()) return;

        setStep((s) => Math.min(maxStep, s + 1) as Step);
    };

    const canGoNext = () => {
        if (step === 1) {
            return (
                !errorState.username && !errorState.email && formState.username && formState.email
            );
        }

        if (step === 2) {
            return Object.values(passwdErrors).every(Boolean);
        }

        return true;
    };

    const handleOnChange = (field: FieldTypes) => (value: string) => {
        setFormState((prev) => {
            const next = { ...prev, [field]: value };

            queueMicrotask(() => {
                if (field === 'password') {
                    setPasswdErrors(validatePassword(value));
                } else {
                    validation(field, next);
                }
            });

            return next;
        });
    };

    const validatePassword = (password: string): PasswdErrors => {
        return {
            isEightCharacters: password.length >= 8,
            isOneUppercase: /[A-Z]/.test(password),
            isOneLowercase: /[a-z]/.test(password),
            isOneNumber: /[0-9]/.test(password),
            isOneSpecialSymbol: /[^A-Za-z0-9]/.test(password),
        };
    };

    const validation = (field: ErrorFields, state: FormState) => {
        const error = validateField(field, state);

        setErrorState((prev) => ({ ...prev, [field]: error }));
    };

    const validateField = (field: ErrorFields, state: FormState): string | null => {
        const value = state[field].trim();

        if (value.length === 0) {
            return 'Field can not be empty';
        }

        switch (field) {
            case 'username':
                if (value.length < 5) return 'Minimal 5 characters';
                return null;

            case 'email':
                if (!value.includes('@')) return 'Invalid email';
                return null;

            default:
                return null;
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const isValid = Object.values(passwdErrors).every(Boolean);
        alert('Submited');
        // write later
    };

    return {
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
        handleSubmit,
    };
};
