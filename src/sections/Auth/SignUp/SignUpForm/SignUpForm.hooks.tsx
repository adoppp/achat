import { useEffect, useState, type FormEvent } from "react";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import classNames from "classnames/bind";

import styles from '@/sections/Auth/SignUp/SignUpForm/SignUpForm.module.scss';

import { auth, firestore } from "@/services";
import { ModalPortal } from "@/components/ModalPortal/ModalPortal";
import { IconClose, IconEmail } from "@/assets/svg";
import { Loader } from "@/components/Loader/Loader";
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

const cn = classNames.bind(styles);

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
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isResended, setIsResended] = useState<boolean>(false);
    const users = useUsers();
    const user = auth.currentUser;

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
        } else {
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
            setIsOpen(true);
        } catch (e) {
            setLoading(false);
            console.log('Error ', e);
        }
    };

    const resendEmail = async () => {
        if (!user) return;
        if (isResended) return;

        await sendEmailVerification(user, {
            url: 'http://localhost:5173/signin',
        });

        setIsResended(true);
    };

    const handeClose = () => setIsOpen(false);

    const Modal = isOpen &&
        <ModalPortal>
            <button 
                type="button" 
                className={cn('form__close')}
                onClick={handeClose}
            >
                {IconClose}
            </button>
            <div className={cn('form__content')}>
                {IconEmail}
                <h1>Email Confirmation</h1>
                <p>
                    We have sent an email to 
                    <a href={`mailto:${email}`}> {email}</a>,
                    to confirm your account click the link to confirm your email
                </p>
                <div hidden={isResended}>
                    <p>
                        If you not got any email&nbsp;
                        <button 
                            type="button"
                            onClick={resendEmail}
                        >
                            Resend verification email
                        </button>
                    </p>
                </div>
            </div>
        </ModalPortal>;
    
    const isLoading = loading && <Loader />;

    useEffect(() => {
        const hasPIErrors = errors.nameError !== '' || errors.emailError !== '';
        const hasPIEmptyFields = formState.name.trim() === '' || formState.email.trim() === '';
        const hasPasswdErrors = Object.values(passwdErrors).filter(rule => rule === false).length > 0;

        setDisabledPI(hasPIErrors || hasPIEmptyFields);
        setDisabledPasswd(hasPasswdErrors);
    }, [formState, errors, passwdErrors]);

    return { formState, errors, passwdErrors, handleChange, handleSubmit, disabledPI, disabledPasswd, Modal, isLoading };
};