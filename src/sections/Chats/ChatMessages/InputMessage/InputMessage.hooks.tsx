import { useState, type ChangeEvent } from "react";

interface useInputMessageProps {
    onChange: (value: string | ((prev: string) => string)) => void;
};

export const useInputMessage = ({ onChange }: useInputMessageProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    const handleEmojiClick = (emojiObject: any) => {
        onChange(prev => prev + emojiObject.emoji);
        setIsOpen(false);
    };

    return { isOpen, setIsOpen, handleChange, handleEmojiClick };
};