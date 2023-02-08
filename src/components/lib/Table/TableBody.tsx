import type { FC, PropsWithChildren } from 'react';

const TableBody: FC<PropsWithChildren> = ({ children }) => {
  return <tbody>{children}</tbody>;
};

export default TableBody;
