import type { FC, PropsWithChildren } from 'react';

import Text from '../Text';
import type CardProps from './Card.props';

const Card: FC<PropsWithChildren<CardProps>> = ({
  title,
  titleComponent,
  className,
  actionComponent,
  children,
}) => {
  return (
    <div
      className={`flex w-full flex-col gap-3 rounded-md border bg-transparent p-5 ${
        className || ''
      }`}
    >
      <div className="flex w-full items-center gap-3">
        {title && <Text className="font-semibold">{title}</Text>}

        {titleComponent && titleComponent}

        {actionComponent && actionComponent}
      </div>

      {children}
    </div>
  );
};

export default Card;
