import type { FC, PropsWithChildren } from 'react';

import { UserProvider } from './user';

const AppContext: FC<PropsWithChildren> = ({ children }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default AppContext;
