import type { InputHTMLAttributes, ReactNode, MouseEvent } from "react";

export interface InputProps {
    id?: string;

    label?: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;

    size?: 's' | 'm' | 'l';
    type?: InputHTMLAttributes<HTMLInputElement>['type'];

    error?: string | null;
    disabled?: boolean;

    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    onClickleft?: (e: MouseEvent<HTMLButtonElement>) => void;
    onClickright?: (e: MouseEvent<HTMLButtonElement>) => void;

    autoComplete?: InputHTMLAttributes<HTMLInputElement>['autoComplete'];
    customClass?: {
        container?: string;
        label?: string;
        input?: string;
        error?: string;
    };
};