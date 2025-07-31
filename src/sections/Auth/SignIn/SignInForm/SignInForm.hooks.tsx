import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { browserLocalPersistence, browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/services";

interface FormStateProps {
    email: string;
    password: string;
};

interface ErrorsProps {
    emailError: string;
    passwordError: string;
};

const initialFormState: FormStateProps = {
    email: '',
    password: '',
};

const initialErrorState: ErrorsProps = {
    emailError: '',
    passwordError: '',
};

export const useSignInForm = () => {
    const [formState, setFormState] = useState<FormStateProps>(initialFormState);
    const [errors, setErrors] = useState<ErrorsProps>(initialErrorState);
    const [disabled, setDisabled] = useState<boolean>(true);
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const navigate = useNavigate();

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

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();  

        if (disabled) return;

        try {
            await setPersistence(
                auth,
                rememberMe ? browserLocalPersistence : browserSessionPersistence
            );

            await signInWithEmailAndPassword(
                auth, 
                formState.email, 
                formState.password
            );

            navigate('/chats');
        } catch (e) {
            console.log('Error ', e);
        }
    };

    useEffect(() => {
        const hasErrors =
            errors.emailError !== '' ||
            errors.passwordError !== '';

        const hasEmptyFields =
            formState.email.trim() === '' ||
            formState.password.trim() === '';

        setDisabled(hasErrors || hasEmptyFields);
    }, [formState, errors]);

    return { formState, errors, handleChange, handleSubmit, disabled, rememberMe, setRememberMe };
};