import { type FC, type ReactElement } from "react";
import classNames from "classnames/bind";

import styles from '@/sections/Auth/SignIn/SignInForm/SignInForm.module.scss';

import { InputEmail } from "@/ui/InputEmail/InputEmail";
import { InputPassword } from "@/ui/InputPassword/InputPassword";
import { useSignInForm } from "@/sections/Auth/SignIn/SignInForm/SignInForm.hooks";
import { Button } from "@/ui/Button/Button";
import { InputCheckbox } from "@/ui/InputCheckbox/InputCheckbox";
import { IconLogo } from "@/assets/svg";

const cn = classNames.bind(styles);

export const SignInForm: FC = (): ReactElement => {
    const { formState, errors, handleChange, handleSubmit, disabled, rememberMe, setRememberMe } = useSignInForm();

    return (
        <section className={cn('signin')}>
            <div className={cn('signin__container')}>
                <div className={cn('signin__logo')}>
                    {IconLogo}
                </div>
                <h1 className={cn('signin__title')}>
                    Welcome back
                </h1>
                <p className={cn('signin__subtitle')}>
                    Sign in to continue
                </p>
                <div className={cn('signin__form')}>
                    <form onSubmit={handleSubmit}>
                        <InputEmail 
                            value={formState.email}
                            onChange={handleChange('email')}
                            placeholder="Email"
                            id="email"
                            error={errors.emailError}
                            customClass={{ container: cn('input__margin'), input: cn('input__bg')}}
                        />
                        <InputPassword 
                            value={formState.password}
                            onChange={handleChange('password')}
                            placeholder="Password"
                            id="password"
                            error={errors.passwordError}
                            customClass={{ container: cn('input__margin'), input: cn('input__bg') }}
                        />
                        <InputCheckbox 
                            id="remember"
                            label="Remember me" 
                            checked={rememberMe} 
                            onChange={setRememberMe} 
                            customClass={{ container: cn('input__margin__last')}}
                        />
                        <Button 
                            label="Sign in" 
                            type="submit"
                            disabled={disabled}
                        />
                    </form>
                </div>
            </div>
        </section>
    )
};