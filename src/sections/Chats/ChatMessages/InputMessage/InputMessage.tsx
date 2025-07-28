import { useState, type ChangeEvent, type FC, type ReactElement } from "react";
import EmojiPicker from 'emoji-picker-react';
import classNames from "classnames/bind";

import styles from '@/sections/Chats/ChatMessages/InputMessage/InputMessage.module.scss';
import { IconEmoji } from "@/assets/svg";

interface InputMessageProps {
    placeholder?: string;
    value: string;
    onChange: (value: string | ((prev: string) => string)) => void;
    id: string;
    customClass?: {
        container?: string,
        label?: string,
        input?: string,
        error?: string,
    };
};

const cn = classNames.bind(styles);

export const InputMessage: FC<InputMessageProps> = ({ placeholder, value, onChange, id, customClass }): ReactElement => {
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    const handleEmojiClick = (emojiObject: any) => {
        onChange(prev => prev + emojiObject.emoji);
        setIsOpen(false);
    };

    return (
        <div className={cn('input', customClass?.container)}>
            <label htmlFor={id}>
                <button type='button'>

                </button>
                <button 
                    type="button" 
                    className={cn('input__emoji__btn')}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {IconEmoji}
                </button>
                {
                    isOpen &&
                    <div className={cn('input__emoji__box')}>
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </div>
                }
                <input 
                    type='text'
                    placeholder={placeholder}
                    value={value} 
                    onChange={handleChange}  
                    className={cn('input__element', customClass?.input)}
                    id={id}
                />
            </label>
        </div>
    );
};