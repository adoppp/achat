import { type FC, type ReactElement } from "react";
import classNames from "classnames/bind";

import styles from '@/sections/Auth/SignUp/SignUpForm/SignUpForm.module.scss';

import { Input } from "@/ui/Input/Input";
import { InputEmail } from "@/ui/InputEmail/InputEmail";
import { InputPassword } from "@/ui/InputPassword/InputPassword";
import { useSignUpForm } from "./SignUpForm.hooks";

const cn = classNames.bind(styles);

export const SignUpForm: FC = (): ReactElement => {
    const { formState, errors, handleChange } = useSignUpForm();

    return (
        <div className={cn('form')}>
            <form className={cn('form__element')}>
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
            </form>
        </div>
    )
};