import { useState, type FC, type ReactElement } from "react";

import { InputEmail } from "@/ui/InputEmail/InputEmail";

const Chats: FC = (): ReactElement => {
    const [name, setName] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const validation = (value: string) => {
        setError(null);

        if(value.trim().length < 3) {
            setError('At least 3 charactes');
        } else if (!value.includes('@')) {
            setError("@ is important")
        }
    };

    const handleChange = (value: string) => {
        validation(value);
        setName(value);
    };

    return (
        <div>
            Chats   
            <InputEmail
                label='Email'
                value={name}
                placeholder="Type your email"
                onChange={handleChange}
                error={error}
                id="e-mail"
            />
        </div>
    );
};

export default Chats;