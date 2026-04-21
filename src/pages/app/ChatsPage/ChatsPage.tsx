import { useState, type FC } from 'react';
// import classNames from 'classnames/bind';

import { Button } from '@/ui/Button/Button';

// import styles from '@/pages/app/ChatsPage/ChatsPage.module.scss';
import { IconArrowLeft, IconArrowRight } from '@/assets/svg';

// const cn = classNames.bind(styles);

const ChatsPage: FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
        </div>
    );
};

export default ChatsPage;
