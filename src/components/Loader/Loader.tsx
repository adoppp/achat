import classNames from "classnames/bind";

import styles from '@/components/Loader/Loader.module.scss';

const cn = classNames.bind(styles);

export const Loader = () => {
  return (
    <div className={cn('loader')}></div>
  );
};
