import { useState, type FormEvent } from "react";
import type { ErrorFields, ErrorState, FieldTypes, FormState, PasswdErrors } from "@/sections/auth/SignUpForm/SignUpForm.types";

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

const prevMap = {
    1: 1,
    2: 1,
    3: 2,
} as const;

const nextMap = {
    1: 2,
    2: 3,
    3: 3,
} as const;

export const  useSignUpForm = () => {
    const [formState, setFormState] = useState<FormState>(initialFormState);
    const [errorState, setErrorState] = useState<ErrorState>(initialErrorsState);
    const [passwdErrors, setPasswdErrors] = useState<PasswdErrors>(initialPasswdErrors);
    const [step, setStep] = useState<1 | 2 | 3>(1);

    const _prev = () => setStep(prevMap[step]);

    const _next = () => setStep(nextMap[step]);

    const handleOnChange = (field: FieldTypes) => (value: string) => {
        const newState = { ...formState, [field]: value };

        setFormState(newState);

        if (field === 'password') {
            const checked = validatePassword(value);

            setPasswdErrors(checked);
        } else {
            validation(field, newState);
        }
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

        setErrorState(prev => ({ ...prev, [field]: error }));
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
        alert('Submited')
        // write later
    };

    return {
        formState,
        errorState,
        passwdErrors,
        step,
        _prev,
        _next,
        handleOnChange,
        handleSubmit
    };
};