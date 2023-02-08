import type { ReactNode } from 'react';

export default interface CardProps {
  title?: string;
  titleComponent?: ReactNode;
  className?: string;
  actionComponent?: ReactNode;
}
