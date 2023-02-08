import Link from 'next/link';
import type { FC, PropsWithChildren } from 'react';

import type { TableCellProps } from './TableProps';
import styles from './Tables.module.scss';

const TableCell: FC<PropsWithChildren<TableCellProps>> = ({
  children,
  url,
  onClick,
}) => {
  return (
    <td onClick={onClick} className={styles.table__cell}>
      {url ? (
        <Link href={url} className="w-full">
          <a>{children}</a>
        </Link>
      ) : (
        children
      )}
    </td>
  );
};

export default TableCell;
