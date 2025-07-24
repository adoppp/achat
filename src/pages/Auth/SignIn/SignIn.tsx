import type { FC, ReactElement } from "react";
import classNames from "classnames/bind";

import styles from '@/pages/Auth/SignIn/SignIn.module.scss';

import { SignInForm } from "@/sections/Auth/SignIn/SignInForm/SignInForm";

const cn = classNames.bind(styles);

const SignIn: FC = (): ReactElement => {
  return (
    <div className={cn('signup')}>
      <SignInForm />
    </div>
  );
};

export default SignIn;