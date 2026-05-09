import classNames from "classnames/bind"
import type { FC } from "react"
import styles from '@/components/Loader/Loader.module.scss';

const cn = classNames.bind(styles);

export const Loader: FC = () => {
    return (
        <span className={cn('loader')}></span>
    )
}