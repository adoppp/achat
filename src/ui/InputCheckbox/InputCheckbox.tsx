import type { FC, ReactElement } from "react";
import classNames from "classnames/bind";

import styles from '@/ui/InputCheckbox/InputCheckbox.module.scss';
import { IconCheckbox } from "@/assets/svg";

interface InputCheckboxProps {
    id: string;
    label?: string;
    checked: boolean;
    onChange: (value: boolean) => void;
    customClass?: {
        container?: string,
        label?: string,
        element?: string,
    }
};

const cn = classNames.bind(styles);

export const InputCheckbox: FC<InputCheckboxProps> = ({ id, label, checked, onChange, customClass }): ReactElement => {
    const handleOnChange = () => {
        onChange(!checked)
    };

    return (
        <div className={cn('input', customClass?.container)}>
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={handleOnChange}
                className={cn('input__element')}
            />
            <label htmlFor={id} className={cn('input__label', customClass?.label)}>
                <span className={cn('input__text')}>{label}</span>
                <span className={cn('checkbox')}>
                    {IconCheckbox}
                </span>
            </label>
        </div>
    );
};