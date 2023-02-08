import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import type { FC, PropsWithChildren } from 'react';
import { useContext, useEffect } from 'react';

import { UserContext } from '@/contexts/user';

const AuthCheck: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { logout } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
    } else {
      const userData: any = jwtDecode(token);

      if (!userData) {
        localStorage.removeItem('token');
        logout();
        router.push('/login');
        return;
      }

      if (userData?.exp && userData.exp * 1000 < Date.now()) {
        logout();
        localStorage.removeItem('token');
        router.push('/login');
      }
    }
  }, []);

  return <>{children}</>;
};

export default AuthCheck;
