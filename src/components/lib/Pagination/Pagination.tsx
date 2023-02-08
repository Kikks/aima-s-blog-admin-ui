import { Icon } from '@iconify/react';
import type { FC } from 'react';
import ReactPaginate from 'react-paginate';

import { useMediaQuery } from '@/hooks';

import Text from '../Text';
import styles from './Pagination.module.scss';
import type PaginationProps from './PaginationProps';

const Pagination: FC<PaginationProps> = ({
  setPage,
  count,
  page,
  shortText = false,
}) => {
  const smallScreen = useMediaQuery('(max-width: 600px)');

  return (
    <div className={styles.wrapper}>
      <div>
        <ReactPaginate
          breakLabel="..."
          onPageChange={(selectedItem) => setPage(selectedItem.selected + 1)}
          pageRangeDisplayed={2}
          pageCount={count}
          renderOnZeroPageCount={() => null}
          className={styles.container}
          pageClassName={styles.page}
          activeClassName={styles.active__page}
          previousLabel={
            <button
              disabled={page <= 1}
              className={`${styles.navigator} ${styles.navigator__previous}`}
            >
              <Icon icon="mdi:arrow-left-thin" className="text-2xl" />
              {!smallScreen && !shortText && (
                <Text variant="caption">Previous Page</Text>
              )}
            </button>
          }
          nextLabel={
            <button
              disabled={page === count || count === 1}
              className={`${styles.navigator} ${styles.navigator__next}`}
            >
              {!smallScreen && !shortText && (
                <Text variant="caption">Next Page</Text>
              )}
              <Icon icon="mdi:arrow-right-thin" className="text-2xl" />
            </button>
          }
        />
      </div>
    </div>
  );
};

export default Pagination;
