import { Icon } from '@iconify/react';
import type { FC } from 'react';

import Text from '@/components/lib/Text';
import match from '@/utils/match';

import styles from './EmptyItem.module.scss';
import type EmptyItemProps from './EmptyItem.props';

const EmptyItem: FC<EmptyItemProps> = ({ variant, onClick }) => {
  const variantBase = match(variant, {
    short: styles.base,
    long: `${styles.base} ${styles.base__long}`,
    default: styles.base || '',
  });

  return (
    <button className={`${variantBase}`} onClick={onClick}>
      <Icon
        icon="material-symbols:add"
        className="text-4xl text-aima-black/50"
      />

      <Text>Add Featured Post</Text>
    </button>
  );
};

export default EmptyItem;
