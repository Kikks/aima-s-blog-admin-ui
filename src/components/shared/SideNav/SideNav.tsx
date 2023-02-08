import { Icon } from '@iconify/react';
import Image from 'next/image';
import type { FC } from 'react';

import useAppDispatch from '../../../hooks/useAppDispatch';
import { logout } from '../../../store/slices/userSlice';
import { links, links2 } from './data';
import type SideNavProps from './SideNav.props';
import SideNavLink from './SideNavLink';

const SideNav: FC<SideNavProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed z-[900] h-screen w-screen bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 z-[1000] flex h-full w-[300px] flex-col gap-5 overflow-y-auto overflow-x-hidden bg-white px-5 py-7  duration-300 lg:static 2xl:w-[20vw] 2xl:max-w-none ${
          isOpen
            ? 'left-0 translate-x-0 lg:left-0'
            : 'left-[-100%] translate-x-[-100%] lg:right-0 lg:translate-x-[0]'
        }`}
      >
        <div className="mb-5 flex w-full items-center justify-between pl-4">
          <figure className="relative flex h-8 w-24 md:h-14 md:w-32">
            <Image
              className="h-full w-full object-contain"
              layout="fill"
              src="/assets/icons/logo.svg"
              alt="Gas Rail Logo"
            />
          </figure>

          <button
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-black/10 lg:hidden"
          >
            <Icon
              className="text-2xl text-aima-black"
              icon="codicon:chrome-close"
            />
          </button>
        </div>

        <div className="w-full">
          {links.map((link, index) => (
            <SideNavLink key={index} {...link} />
          ))}
        </div>

        <hr className="border-rails-dark-gray/20 w-full" />

        <div className="w-full flex-1">
          {links2.map((link, index) => (
            <SideNavLink key={index} {...link} />
          ))}
        </div>

        <hr className="border-rails-dark-gray/20 w-full" />

        <div className="w-full">
          <SideNavLink
            url="/settings"
            icon="material-symbols:settings-outline"
            title="Settings"
          />

          <SideNavLink
            url="/login"
            icon="ant-design:logout-outlined"
            title="Logout"
            onClick={handleLogout}
          />
        </div>
      </aside>
    </>
  );
};

export default SideNav;
