import type { FC, PropsWithChildren } from 'react';

import styles from './Tables.module.scss';

const Table: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.table_container}>
      <table className={styles.table}>{children}</table>
    </div>
  );
};

export default Table;
