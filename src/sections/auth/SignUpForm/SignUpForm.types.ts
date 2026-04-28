export interface FormState {
    username: string;
    email: string;
    password: string;
};

export type FieldTypes = keyof FormState;

export interface ErrorState {
    username: string | null;
    email: string | null;
};

export type ErrorFields = keyof ErrorState;

export interface PasswdErrors {
    isEightCharacters: boolean;
    isOneUppercase: boolean;
    isOneLowercase: boolean;
    isOneNumber: boolean;
    isOneSpecialSymbol: boolean;
};