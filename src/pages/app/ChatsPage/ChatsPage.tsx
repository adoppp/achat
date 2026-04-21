import { 
    useState, 
    type FC 
} from 'react';
import classNames from 'classnames/bind';

import { Button } from '@/ui/Button/Button';

import styles from '@/pages/app/ChatsPage/ChatsPage.module.scss';

const cn = classNames.bind(styles);

const ChatsPage: FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleOnClickTest = () => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 5000);
    }

    return (
        <div>
            Select a chat
            <Button 
                isLoading={isLoading} 
                onClick={handleOnClickTest}
                size='s'
            >
                Click1
            </Button>
            <Button 
                isLoading={isLoading} 
                onClick={handleOnClickTest}
                variant='secondary'
            >
                Click2
            </Button>
            <Button 
                isDisabled 
                onClick={handleOnClickTest}
            >
                Click3
            </Button>
        </div>
    );
};

export default ChatsPage;
