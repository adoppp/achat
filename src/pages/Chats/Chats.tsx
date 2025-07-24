import { type FC, type ReactElement } from "react";

import { Button } from "@/ui/Button/Button";
import { signOut } from "firebase/auth";
import { auth } from "@/services";

const Chats: FC = (): ReactElement => {

    const handleOnClick = async () => {
        await signOut(auth);
    };

    return (
        <div>
            Chats   
            <Button label="Log out" onClick={handleOnClick} />
        </div>
    );
};

export default Chats;