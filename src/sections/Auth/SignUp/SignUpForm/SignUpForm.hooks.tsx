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
    passwordError: string;
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
    passwordError: '',
};

export const useSignUpForm = () => {
    const [formState, setFormState] = useState<FormStateProps>(initialFormState);
    const [errors, setErrors] = useState<ErrorsProps>(initialErrorState);
    const [disabled, setDisabled] = useState<boolean>(true);
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isResended, setIsResended] = useState<boolean>(false);
    const users = useUsers();
    const user = auth.currentUser;

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
            setLoading(true);

            const isNameInUse = users.find(user => user.displayName === formState.name);

            if (isNameInUse) {
                setLoading(false);
                setErrors((prev) => ({ ...prev, nameError: 'Name is already in use'}))
                return;
            };

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

    return { formState, errors, handleChange, handleSubmit, disabled, Modal, isLoading };
};