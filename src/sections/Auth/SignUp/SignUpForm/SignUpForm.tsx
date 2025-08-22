import { type FC, type ReactElement } from "react";
import classNames from "classnames/bind";

import styles from '@/sections/Auth/SignUp/SignUpForm/SignUpForm.module.scss';

import { Input } from "@/ui/Input/Input";
import { InputEmail } from "@/ui/InputEmail/InputEmail";
import { InputPassword } from "@/ui/InputPassword/InputPassword";
import { useSignUpForm } from "@/sections/Auth/SignUp/SignUpForm/SignUpForm.hooks";
import { Button } from "@/ui/Button/Button";
import { IconArrowLeft, IconCheckMark, IconClose, IconEmail, IconLock, IconUser } from "@/assets/svg";
import { TextButton } from "@/ui/TextButton/TextButton";

const cn = classNames.bind(styles);

export const SignUpForm: FC = (): ReactElement => {
    const { formState, errors, passwdErrors, handleChange, handleSubmit, disabledPI, disabledPasswd, strength, step, _next, _prev, navigate, email, resendEmail, isResended, timeLeft, isLoading } = useSignUpForm();

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
                                step === 1 ? 'All users can see your name and email' : step === 2 ? 'Choose a strong password to secure your account' : `We have sent a link to ${email}, open it to verify your account.`
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
                                        strength={strength}
                                        customClass={{ container: cn('input__margin__last')}}
                                    />
                                    <div className={cn('signup__passwd')}>
                                        <h3>Password must contain:</h3>
                                        <ul>
                                            <li>
                                                <span className={cn(passwdErrors.isEightCharacters ? 'signup__correct' : 'signup__mistake')}>
                                                    {passwdErrors.isEightCharacters ? IconCheckMark : IconClose}
                                                </span>
                                                At least 8 characters
                                            </li>
                                            <li>
                                                <span className={cn(passwdErrors.isOneUppercase ? 'signup__correct' : 'signup__mistake')}>
                                                    {passwdErrors.isOneUppercase ? IconCheckMark : IconClose}
                                                </span>
                                                One uppercase letter
                                            </li>
                                            <li>
                                                <span className={cn(passwdErrors.isOneLowercase ? 'signup__correct' : 'signup__mistake')}>
                                                    {passwdErrors.isOneLowercase ? IconCheckMark : IconClose}
                                                </span>
                                                One lowercase letter
                                            </li>
                                            <li>
                                                <span className={cn(passwdErrors.isOneNumber ? 'signup__correct' : 'signup__mistake')}>
                                                    {passwdErrors.isOneNumber ? IconCheckMark : IconClose}
                                                </span>
                                                One number
                                            </li>
                                            <li>
                                                <span className={cn(passwdErrors.isOneSpecialSymbol ? 'signup__correct' : 'signup__mistake')}>
                                                    {passwdErrors.isOneSpecialSymbol ? IconCheckMark : IconClose}
                                                </span>
                                                One special character
                                            </li>
                                        </ul>
                                    </div>
                                </> : 
                                <Button label={timeLeft > 0 ? timeLeft.toString() : 'Resend email'} type="button" disabled={timeLeft > 0 || isResended} onClick={resendEmail} />
                            }
                        </form>
                    </div>
                </div>
                <div>
                    {
                        step === 1 ?
                        <Button label="Continue" type='button' onClick={_next} disabled={disabledPI} /> :
                        step === 2 ?
                        <Button label="Sign in" type='submit' form="signup-form" disabled={disabledPasswd} /> :
                        <></>

                    }
                    {
                        step === 2 &&
                        <TextButton label="Back to the previous step" customClass={cn('signup__continue')} onClick={_prev} disabled={isResended} iconLeft={IconArrowLeft} />
                    }
                </div>
            </div>
            {isLoading!}
        </div>
    )
};