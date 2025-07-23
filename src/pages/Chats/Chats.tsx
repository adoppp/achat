import { useState, type FC, type ReactElement } from "react";

import { InputPassword } from "@/ui/InputPassword/InputPassword";

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
            <InputPassword
                label='Password'
                value={name}
                placeholder="Type your password"
                onChange={handleChange}
                error={error}
                id="password"
            />
        </div>
    );
};

export default Chats;