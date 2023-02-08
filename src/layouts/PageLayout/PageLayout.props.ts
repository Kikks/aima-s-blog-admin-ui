import type { ReactNode } from 'react';

export default interface PageLayoutProps {
  meta: ReactNode;
  title?: string;
  actionButton?: ReactNode;
  back?: boolean;
}
