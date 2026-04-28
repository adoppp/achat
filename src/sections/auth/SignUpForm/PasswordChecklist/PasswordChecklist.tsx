import type { FC } from "react";
import type { PasswdErrors } from "../SignUpForm.types";

interface PasswordChecklistProps {
    errors: PasswdErrors;
};

const passwordErrorMessages: Record<keyof PasswdErrors, string> = {
    isEightCharacters: 'At least 8 characters',
    isOneUppercase: 'At least one uppercase letter',
    isOneLowercase: 'At least one lowercase letter',
    isOneNumber: 'At least one number',
    isOneSpecialSymbol: 'At least one special symbol',
};

export const PasswordChecklist: FC<PasswordChecklistProps> = ({ errors }) => {
    const items = Object.entries(errors).map(([key, isValid]) => {
        const typedKey = key as keyof PasswdErrors;

        return (
            <li key={key} style={{ background: isValid ? 'green' : 'red'}}>
                {passwordErrorMessages[typedKey]}
            </li>
        );
    });

    return (
        <ul>
            {items}
        </ul>
    );
};