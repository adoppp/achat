import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import Notiflix from "notiflix";

import { auth, firestore } from "@/services";
import { useUsers } from "@/utils/useUsers";

interface FormStateProps {
    name: string;
    email: string;
    password: string;
};

interface ErrorsProps {
    nameError: string;
    emailError: string;
};

interface PasswdErrorsProps {
    isEightCharacters: boolean;
    isOneUppercase: boolean;
    isOneLowercase: boolean;
    isOneNumber: boolean;
    isOneSpecialSymbol: boolean;
};

const initialFormState: FormStateProps = {
    name: '',
    email: '',
    password: '',
};

const initialErrorState: ErrorsProps = {
    nameError: '',
    emailError: '',
};

const initialPasswdErrors = {
    isEightCharacters: false,
    isOneUppercase: false,
    isOneLowercase: false,
    isOneNumber: false,
    isOneSpecialSymbol: false,
};

export const useSignUpForm = () => {
    const [formState, setFormState] = useState<FormStateProps>(initialFormState);
    const [errors, setErrors] = useState<ErrorsProps>(initialErrorState);
    const [passwdErrors, setPasswdErrors] = useState<PasswdErrorsProps>(initialPasswdErrors);
    const [disabledPI, setDisabledPI] = useState<boolean>(true);
    const [disabledPasswd, setDisabledPasswd] = useState<boolean>(true);
    const [strength, setStrength] = useState<1 | 2 | 3>(1);
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [timeLeft, setTimeLeft] = useState<number>(60); 
    const [isResended, setIsResended] = useState<boolean>(false);
    const [step, setStep] = useState<number>(1);
    const navigate = useNavigate();
    const users = useUsers();
    const user = auth.currentUser;
    
    const _prev = () => setStep(step - 1);
    const _next = () => setStep(step + 1);

    const handleChange = (field: keyof FormStateProps) => (value: string) => {
        setFormState(prev => {
            const newState = { ...prev, [field]: value };
            validation(newState, field);
            return newState;
        });
    };

    const validatePassword = (password: string): PasswdErrorsProps => {
        return {
            isEightCharacters: password.length >= 8,
            isOneUppercase: /[A-Z]/.test(password),
            isOneLowercase: /[a-z]/.test(password),
            isOneNumber: /[0-9]/.test(password),
            isOneSpecialSymbol: /[^A-Za-z0-9]/.test(password),
        };
    };

    const validation = (formProps: FormStateProps, field: keyof FormStateProps) => {
        const errorField = `${field}Error` as keyof ErrorsProps;

        setErrors((prev) => ({ ...prev, [errorField]: ''}));

        if (field === 'name') {
            const isNameInUse = users.find(user => user.displayName === formProps.name);
            if (isNameInUse) {
                setErrors((prev) => ({ ...prev, [errorField]: 'Name is already in use'}))
            }
        } else if (field === 'email' && formProps[field].length > 0 && !formProps[field].includes('@')) {
            setErrors((prev) => ({
                ...prev,
                emailError: '"@" is required',
            }));
        } else if (field === 'password') {
            if (formProps.password.trim().length === 0) {
                console.log(1)
                setPasswdErrors(initialPasswdErrors);
            } else {
                const checkedPasswd = validatePassword(formProps.password.trim());

                setPasswdErrors(checkedPasswd);
            }
        } else if (formProps[field].trim().length === 0) {
            setErrors((prev) => ({ 
                ...prev, 
                [errorField]: 'Field can not be empty'
            }));
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();  

        try {
            setLoading(true);

            const userCredentials = await createUserWithEmailAndPassword(
                auth, formState.email, formState.password
            );

            const user = userCredentials.user;

            await updateProfile(user, { displayName: formState.name});

            const userRef = doc(firestore, 'users', user.uid);

            await setDoc(userRef, {
                uid: user.uid,
                displayName: formState.name,
                email: user.email,
                photoURL: user.photoURL,
                bio: null,
                createdAt: serverTimestamp(),
            });

            setEmail(user.email as string);

            await sendEmailVerification(user, {
                url: 'http://localhost:5173/signin',
            });

            setLoading(false);
            _next();
        } catch (e) {
            setLoading(false);
            console.log('Error ', e);
        }
    };

    const resendEmail = async () => {
        if (!user) return;
        if (isResended) return;

        try {
            setLoading(true);

            await sendEmailVerification(user, {
                url: 'http://localhost:5173/signin',
            });

            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log('Error ', e);
        }

        setIsResended(true);
    };
    
    const isLoading = loading ? Notiflix.Loading.standard() :  Notiflix.Loading.remove();

    useEffect(() => {
        const hasPIErrors = errors.nameError !== '' || errors.emailError !== '';
        const hasPIEmptyFields = formState.name.trim() === '' || formState.email.trim() === '';
        const hasPasswdErrors = Object.values(passwdErrors).filter(rule => rule === false).length;

        setDisabledPI(hasPIErrors || hasPIEmptyFields);
        setDisabledPasswd(hasPasswdErrors > 0);

        if (formState.password.length < 8) {
            setStrength(1); 
        } else if (formState.password.length >= 8 && hasPasswdErrors > 0) {
            setStrength(2);
        } else if (formState.password.length >= 8 && hasPasswdErrors === 0) {
            setStrength(3); 
        };
    }, [formState, errors, passwdErrors]);

    useEffect(() => {
        if (step !== 3) return;
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer); 
    }, [timeLeft, step]);

    return { formState, errors, passwdErrors, handleChange, handleSubmit, disabledPI, disabledPasswd, strength, step, _next, _prev, navigate, email, resendEmail, isResended, timeLeft, isLoading };
};