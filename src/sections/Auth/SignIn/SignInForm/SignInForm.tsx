import { type FC, type ReactElement } from "react";
import classNames from "classnames/bind";

import styles from '@/sections/Auth/SignIn/SignInForm/SignInForm.module.scss';

import { InputEmail } from "@/ui/InputEmail/InputEmail";
import { InputPassword } from "@/ui/InputPassword/InputPassword";
import { useSignInForm } from "@/sections/Auth/SignIn/SignInForm/SignInForm.hooks";
import { Button } from "@/ui/Button/Button";

const cn = classNames.bind(styles);

export const SignInForm: FC = (): ReactElement => {
    const { formState, errors, handleChange, handleSubmit, disabled } = useSignInForm();

    return (
        <div className={cn('form')}>
            <h1 className={cn('form__heading')}>Sign In</h1>
            <form className={cn('form__element')} onSubmit={handleSubmit}>
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
                    label="Sign in" 
                    type="submit"
                    disabled={disabled}
                />
            </form>
        </div>
    )
};