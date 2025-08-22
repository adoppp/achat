import { useState, type FC, type ReactElement } from "react";
import { Link, useNavigate } from "react-router";
import classNames from "classnames/bind";

import styles from '@/sections/Auth/SignUp/SignUpForm/SignUpForm.module.scss';

import { Input } from "@/ui/Input/Input";
import { InputEmail } from "@/ui/InputEmail/InputEmail";
import { InputPassword } from "@/ui/InputPassword/InputPassword";
import { useSignUpForm } from "@/sections/Auth/SignUp/SignUpForm/SignUpForm.hooks";
import { Button } from "@/ui/Button/Button";
import { IconArrowLeft, IconCheckbox, IconCheckMark, IconEmail, IconLock, IconUser } from "@/assets/svg";
import { TextButton } from "@/ui/TextButton/TextButton";

const cn = classNames.bind(styles);

export const SignUpForm: FC = (): ReactElement => {
    const { formState, errors, passwdErrors, handleChange, handleSubmit, disabledPI, disabledPasswd, Modal, isLoading } = useSignUpForm();

    const [step, setStep] = useState<number>(1);
    const navigate = useNavigate();

    const _prev = () => setStep(step - 1);
    const _next = () => setStep(step + 1);

    return (
        <div className={cn('signup')}>
            <header className={cn('signup__header')}>
                <div>
                    <TextButton onClick={() => navigate(-1)} iconLeft={IconArrowLeft} />
                    <h1>
                        Sign Up
                    </h1>
                </div>
            </header>
            <div className={cn('signup__content')}>
                <div>
                    <div className={cn('signup__progress')}>
                        <ul>
                            <li className={cn(step >= 1 && 'active')}>
                                <span>
                                    {
                                        step === 1 ? '1' : step > 1 ? IconCheckMark : ''
                                    }
                                </span>
                                <p>Personal info</p>
                            </li>
                            <li className={cn(step >= 2 && 'active')}>
                                <span>
                                    {
                                        step === 2 ? '2' : step > 2 ? IconCheckMark : ''
                                    }
                                </span>
                                <p>Password</p>
                            </li>
                            <li className={cn(step >= 3 && 'active')}>
                                <span>
                                    {
                                        step === 3 ? '3' : step > 3 ? IconCheckMark : ''
                                    }
                                </span>
                                <p>Complete</p>
                            </li>
                        </ul>
                    </div>
                    <div className={cn('signup__icon')}>
                        {
                            step === 1 ? IconUser : step === 2 ? IconLock : IconEmail
                        }
                    </div>
                    <div className={cn('signup__info')}>
                        <h2>
                            {
                                step === 1 ? 'Type your name and email' : step === 2 ? 'Create password' : 'Verify your email'
                            }
                        </h2>
                        <p>
                            {
                                step === 1 ? 'All users can see your name and email' : step === 2 ? 'Choose a strong password to secure your account' : `We have sent a link to EMAIL, open it to verify your account`
                            }
                        </p>
                    </div>
                    <div className={cn('signup__form')}>
                        <form id="signup-form" onSubmit={handleSubmit}>
                            {
                                step === 1 ? 
                                <>
                                    <Input 
                                        value={formState.name}
                                        onChange={handleChange('name')}
                                        placeholder="Name"
                                        id="name"
                                        error={errors.nameError}
                                        customClass={{ container: cn('input__margin')}}
                                    />
                                    <InputEmail 
                                        value={formState.email}
                                        onChange={handleChange('email')}
                                        placeholder="Email"
                                        id="email"
                                        error={errors.emailError}
                                    /> 
                                </> :
                                step === 2 ?
                                <>
                                    <InputPassword 
                                        value={formState.password}
                                        onChange={handleChange('password')}
                                        placeholder="Password"
                                        id="password"
                                        customClass={{ container: cn('input__margin__last')}}
                                    />
                                    <div className={cn('signup__passwd')}>
                                        <h3>Password must contain:</h3>
                                        <ul>
                                            <li>
                                                <span className={cn(passwdErrors.isEightCharacters ? 'signup__correct' : 'signup__mistake')}></span>
                                                At least 8 characters
                                            </li>
                                            <li>
                                                <span className={cn(passwdErrors.isOneUppercase ? 'signup__correct' : 'signup__mistake')}></span>
                                                One uppercase letter
                                            </li>
                                            <li>
                                                <span className={cn(passwdErrors.isOneLowercase ? 'signup__correct' : 'signup__mistake')}></span>
                                                One lowercase letter
                                            </li>
                                            <li>
                                                <span className={cn(passwdErrors.isOneNumber ? 'signup__correct' : 'signup__mistake')}></span>
                                                One number
                                            </li>
                                            <li>
                                                <span className={cn(passwdErrors.isOneSpecialSymbol ? 'signup__correct' : 'signup__mistake')}></span>
                                                One special character
                                            </li>
                                        </ul>
                                    </div>
                                </> : 
                                <div>Email</div>
                            }
                        </form>
                    </div>
                </div>
                <div>
                    {
                        step === 1 ?
                        <Button label="Continue" type='button' onClick={_next} customClass={cn('signup__continue')} disabled={disabledPI} /> :
                        step === 2 ?
                        <Button label="Sign in" type='submit' customClass={cn('signup__continue')} form="signup-form" disabled={disabledPasswd} /> :
                        <></>

                    }
                    <TextButton label="Back to the previous step" onClick={_prev} disabled={step === 1} iconLeft={IconArrowLeft} />
                </div>
            </div>
                        {/* <div className={cn('form')}>
                            <h1 className={cn('form__heading')}>Sign Up</h1>
                            <form className={cn('form__element')} onSubmit={handleSubmit}>
                                <Input 
                                    value={formState.name}
                                    onChange={handleChange('name')}
                                    placeholder="Name"
                                    id="name"
                                    error={errors.nameError}
                                    customClass={{ container: cn('input__margin')}}
                                />
                                <InputEmail 
                                    value={formState.email}
                                    onChange={handleChange('email')}
                                    placeholder="Email"
                                    id="email"
                                    error={errors.emailError}
                                    customClass={{ container: cn('input__margin')}}
                                />
                                <InputPassword 
                                    value={formState.password}
                                    onChange={handleChange('password')}
                                    placeholder="Password"
                                    id="password"
                                    error={errors.passwordError}
                                    customClass={{ container: cn('input__margin__last')}}
                                />
                                <Button 
                                    label="Sign up" 
                                    type="submit"
                                    disabled={disabled}
                                />
                            </form>
                            <p className={cn('form__navigation')}>
                                Already have an account?
                                <Link to="/signin">Sign in</Link>
                            </p>
                        </div>
                        {isLoading}
                        {Modal} */}
        </div>
    )
};