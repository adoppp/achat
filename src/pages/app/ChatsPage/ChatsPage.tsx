import { useState, type FC } from 'react';
// import classNames from 'classnames/bind';

import { Button } from '@/ui/Button/Button';

// import styles from '@/pages/app/ChatsPage/ChatsPage.module.scss';
import { IconArrowLeft, IconArrowRight } from '@/assets/svg';
import { Input } from '@/ui/Input/Input';
import { InputPassword } from '@/ui/InputPassword/InputPassword';

// const cn = classNames.bind(styles);

const ChatsPage: FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [text, setText] = useState<string>('');

    const handleOnClickTest = () => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 5000);
    };

    return (
        <div>
            Select a chat
            <Button
                isLoading={isLoading}
                onClick={handleOnClickTest}
                leftIcon={IconArrowLeft}
                rightIcon={IconArrowRight}
            >
                Click1
            </Button>
            <Button
                isLoading={isLoading}
                onClick={handleOnClickTest}
                variant="secondary"
                leftIcon={IconArrowLeft}
                size="l"
            >
                Click2
            </Button>
            <Button
                isLoading={isLoading}
                onClick={handleOnClickTest}
                rightIcon={IconArrowRight}
                size="s"
            >
                Click3
            </Button>
            <Input
                value={text}
                onChange={setText}
                size="s"
                label="Name"
                placeholder="John doe"
                error="Error smth went wrong. Please try again"
            />
            <Input
                value={text}
                onChange={setText}
                size="l"
                label="Name"
                placeholder="Ask a question"
                rightIcon={IconArrowRight}
                leftIcon={IconArrowLeft}
            />
            <InputPassword 
                value={text}
                onChange={setText}
                size="l"
            />
        </div>
    );
};

export default ChatsPage;
