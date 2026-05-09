import styles from '@/components/Loader/Loader.module.scss';
import classNames from 'classnames/bind';
import type { FC } from 'react';

const cn = classNames.bind(styles);

export const Loader: FC = () => {
    return <div className={cn('loader')}></div>;
};
