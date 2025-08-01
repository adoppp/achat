import { type FC, type ReactElement } from "react";
import { Link } from "react-router";
import classNames from "classnames/bind";

import styles from '@/sections/Auth/SignUp/SignUpForm/SignUpForm.module.scss';

import { Input } from "@/ui/Input/Input";
import { InputEmail } from "@/ui/InputEmail/InputEmail";
import { InputPassword } from "@/ui/InputPassword/InputPassword";
import { useSignUpForm } from "@/sections/Auth/SignUp/SignUpForm/SignUpForm.hooks";
import { Button } from "@/ui/Button/Button";

const cn = classNames.bind(styles);

export const SignUpForm: FC = (): ReactElement => {
    const { formState, errors, handleChange, handleSubmit, disabled, Modal, isLoading } = useSignUpForm();

    return (
        <>
            <div className={cn('form')}>
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
            {Modal}
        </>
    )
};