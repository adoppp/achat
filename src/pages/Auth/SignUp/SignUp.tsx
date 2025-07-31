import type { FC, ReactElement } from "react";
import classNames from "classnames/bind";

import styles from '@/pages/Auth/SignUp/SignUp.module.scss';

import { SignUpForm } from "@/sections/Auth/SignUp/SignUpForm/SignUpForm";

const cn = classNames.bind(styles);

const SignUp: FC = (): ReactElement => {
    return (
        <section className={cn('signup')}>
            <SignUpForm />
        </section>
    );
};

export default SignUp;