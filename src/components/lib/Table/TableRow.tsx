import type { FC, PropsWithChildren } from 'react';

import type { TableRowProps } from './TableProps';
import styles from './Tables.module.scss';

const TableRow: FC<PropsWithChildren<TableRowProps>> = ({
  children,
  onClick,
}) => {
  return (
    <tr
      className={`${styles.table__row} group ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {children}
    </tr>
  );
};

export default TableRow;
