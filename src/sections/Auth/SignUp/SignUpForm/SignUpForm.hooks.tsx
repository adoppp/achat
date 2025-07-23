import { useEffect, useState, type FormEvent } from "react";

interface FormStateProps {
    name: string;
    email: string;
    password: string;
};

interface ErrorsProps {
    nameError: string;
    emailError: string;
    passwordError: string;
};

const initialFormState: FormStateProps = {
    name: '',
    email: '',
    password: '',
};

const initialErrorState: ErrorsProps = {
    nameError: '',
    emailError: '',
    passwordError: '',
};

export const useSignUpForm = () => {
    const [formState, setFormState] = useState<FormStateProps>(initialFormState);
    const [errors, setErrors] = useState<ErrorsProps>(initialErrorState);
    const [disabled, setDisabled] = useState<boolean>(true);

    const handleChange = (field: keyof FormStateProps) => (value: string) => {
        validation(value, field);
        setFormState((prev) => ({ ...prev, [field]: value }));
    };

    const validation = (value: string, field: keyof FormStateProps) => {
        const errorField = `${field}Error` as keyof ErrorsProps;

        setErrors((prev) => ({ ...prev, [errorField]: ''}));

        if (value.trim().length === 0) {
            setErrors((prev) => ({ 
                ...prev, 
                [errorField]: 'Field can not be empty'
            }));
        } else if (field === 'email' && value.length > 0 && !value.includes('@')) {
            setErrors((prev) => ({
                ...prev,
                emailError: '"@" is required',
            }));
        } else if (field === 'password' && value.length < 8) {
            setErrors((prev) => ({
                ...prev,
                [errorField]: 'Min lenght is 8 characters'
            }))
        };
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();  

        if (disabled) return;
    };

    useEffect(() => {
        const hasErrors =
            errors.nameError !== '' ||
            errors.emailError !== '' ||
            errors.passwordError !== '';

        const hasEmptyFields =
            formState.name.trim() === '' ||
            formState.email.trim() === '' ||
            formState.password.trim() === '';

        setDisabled(hasErrors || hasEmptyFields);
    }, [formState, errors]);

    return { formState, errors, handleChange, handleSubmit, disabled };
};