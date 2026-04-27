import { useState, type FC } from "react";

import { Input } from "@/ui/Input/Input";
import type { InputProps } from '@/ui/Input/Input.types';
import { IconClosedEye, IconEye } from "@/assets/svg";



export const InputPassword: FC<InputProps> = ({ ...props }) => {
    const [visible, setVisible] = useState(false);

    return (
        <Input 
            type={visible ? 'text' : 'password'}
            rightIcon={visible ? IconClosedEye : IconEye}
            onClickright={() => setVisible(!visible)}
            {...props}
        />
    );
};