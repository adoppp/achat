import { useState, type ChangeEvent, type FC, type ReactElement } from "react";
import classNames from "classnames/bind";

import styles from '@/ui/InputPassword/InputPassword.module.scss';

import { IconClosedEye, IconEye } from "@/assets/svg";

interface InputPasswordProps {
    label?: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    error?: string | null;
    id: string;
    strength?: 1 | 2 | 3;
    customClass?: {
        container?: string,
        label?: string,
        input?: string,
        error?: string,
    };
};

const cn = classNames.bind(styles);

export const InputPassword: FC<InputPasswordProps> = ({ label, placeholder, value, onChange, error, id, strength, customClass }): ReactElement => {
    const [visible, setVisible] = useState<boolean>(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    const toggleVisible = () => {
        setVisible(!visible);
    };

    return (
        <div className={cn('input', customClass?.container)}>
            {label && <p className={cn('input__label', customClass?.label)}>{label}</p>}

            <label htmlFor={id}>
                <input 
                    type={visible ? 'text' : 'password'}
                    placeholder={placeholder}
                    value={value} 
                    onChange={handleChange}  
                    className={cn('input__element', customClass?.input)}
                    id={id}
                />
                <button 
                    type="button" 
                    className={cn('input__button')}
                    onClick={toggleVisible}
                >
                    {visible ? IconClosedEye : IconEye}
                </button>
            </label>

            {error && <p className={cn('input__error', customClass?.error)}>{error}</p>}
            {
                strength && 
                <div className={cn('input__strength')}>
                    <ul>
                        <li className={cn('strength', strength === 2 ? 'strength__medium' : strength === 3 ? 'strength__success' : 'strength__error')}></li>
                        <li className={cn('strength', strength === 2 ? 'strength__medium' : strength === 3 && 'strength__success')}></li>
                        <li className={cn('strength', strength === 3 && 'strength__success')}></li>
                    </ul>
                    <p className={cn(strength === 1 ? 'strength__low' : strength === 2 ? 'strength__mid' : 'strength__high')}>Password strength: {strength === 1 ? 'weak' : strength === 2 ? 'good' : 'perfect'}</p>
                </div>
            }
        </div>
    );
};