import { Input } from "@/ui/Input/Input";
import { useState, type FC, type ReactElement } from "react";

const Chats: FC = (): ReactElement => {
    const [name, setName] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const validation = (value: string) => {
        setError(null);

        if(value.trim().length < 3) {
            setError('At least 3 charactes');
        }
    };

    const handleChange = (value: string) => {
        validation(value);
        setName(value);
    };

    return (
        <div>
            Chats   
            <Input
                label='Name'
                value={name}
                placeholder="Type your name"
                onChange={handleChange}
                error={error}
                id="first-name"
            />
        </div>
    );
};

export default Chats;