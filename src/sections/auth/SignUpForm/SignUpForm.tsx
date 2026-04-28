import type { FC } from "react";
import classNames from "classnames/bind";

import styles from '@/sections/auth/SignUpForm/SignUpForm.module.scss';

const cn = classNames.bind(styles);

export const SignUpForm: FC = () => {
    return (
        <div className={cn('signup')}>
            

            <div className={cn('signup__content')}>
                <div className={cn('signup__progress')}>
                    <ul className={'signup__progress--list'}>
                        <li className={'signup__progress--item'}>
                            1
                            <span className={'signup__progress--title'}>Personal info</span>
                        </li>
                        <li>
                            2
                            <span className={'signup__progress--title'}>Password</span>
                        </li>
                        <li>
                            3
                            <span className={'signup__progress--title'}>Verify</span>
                        </li>
                    </ul>
                </div>

                <div className={'signup__description'}>
                    <div className={'signup__description--container'}>
                        icon
                    </div>
                    <h2 className={'signup__description--title'}>
                        todo for user
                    </h2>
                    <p className={'signup__description--description'}>
                        description
                    </p>
                </div>

                <div className={'signup__from'}>
                    <form className={'signup__form--element'}>

                    </form>
                </div>
            </div>
        </div>
    );
};