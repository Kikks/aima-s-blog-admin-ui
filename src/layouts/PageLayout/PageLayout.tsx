import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';
import type { FC, PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';

import Heading from '@/components/lib/Heading';
import SideNav from '@/components/shared/SideNav';
import { useMediaQuery } from '@/hooks';
import trimString from '@/utils/trimString';

import AuthCheck from '../AutchCheck';
import type PageLayoutProps from './PageLayout.props';

const PageLayout: FC<PropsWithChildren<PageLayoutProps>> = ({
  meta,
  title,
  actionButton,
  children,
  back,
}) => {
  const router = useRouter();
  const [sideNavIsOpen, setSideNavIsOpen] = useState(false);
  const largeScreen = useMediaQuery('(min-width: 1200px)');
  const smallScreensDown = useMediaQuery('(max-width: 450px)');

  useEffect(() => {
    setSideNavIsOpen(false);
  }, [largeScreen]);

  const toggleSideNav = () => {
    setSideNavIsOpen((prevState) => !prevState);
  };

  return (
    <AuthCheck>
      {meta}

      <div className="relative flex h-screen w-screen">
        <SideNav isOpen={sideNavIsOpen} onClose={toggleSideNav} />

        <main className="relative flex h-full w-full flex-1 flex-col overflow-y-auto overflow-x-hidden bg-aima-white p-5 pt-0 lg:p-10 lg:pt-0">
          <div className="sticky top-0 left-0 z-[100] grid w-full gap-3 border-b border-black/10 bg-aima-white py-5 lg:pt-10 lg:pb-5">
            <div className="flex w-full items-center gap-3">
              {back && (
                <button
                  onClick={() => router.back()}
                  className="grid h-10 w-10 place-items-center rounded-full hover:bg-black/10"
                >
                  <Icon
                    icon="material-symbols:arrow-back"
                    className="text-2xl text-aima-black"
                  />
                </button>
              )}

              {title && (
                <Heading className="mr-auto font-bold">
                  {trimString(title, smallScreensDown ? 15 : 40)}
                </Heading>
              )}

              {actionButton && !smallScreensDown && actionButton}
              <button
                onClick={toggleSideNav}
                className="grid h-10 w-10 place-items-center rounded-full hover:bg-black/10 lg:hidden"
              >
                <Icon
                  icon="material-symbols:menu-rounded"
                  className="text-2xl text-aima-black"
                />
              </button>
            </div>

            {actionButton && smallScreensDown && (
              <div className="flex w-full justify-end">{actionButton}</div>
            )}
          </div>

          <div className="mt-5 w-full flex-1">{children}</div>
        </main>
      </div>
    </AuthCheck>
  );
};

export default PageLayout;
