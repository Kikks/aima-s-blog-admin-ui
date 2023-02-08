import type { FC } from 'react';

import Text from '../Text';
import type { TableHeadProps } from './TableProps';
import styles from './Tables.module.scss';

const TableHeader: FC<TableHeadProps> = ({ items }) => {
  return (
    <thead>
      <tr className={styles.table__header_row}>
        {items.map((item, index) => (
          <th className={styles.table__header_cell} key={index}>
            <Text
              variant="caption"
              className="font-semibold uppercase text-aima-black/50"
            >
              {item}
            </Text>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
