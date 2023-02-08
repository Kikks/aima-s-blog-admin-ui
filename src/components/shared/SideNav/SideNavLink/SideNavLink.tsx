import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

import Text from '../../../lib/Text';
import type SideNavLinkProps from './SideNavLink.props';

const SideNavLink: FC<SideNavLinkProps> = ({
  foreign,
  icon,
  title,
  url,
  onClick,
  actionButton,
  children,
}) => {
  const { pathname } = useRouter();
  const isActive = pathname.startsWith(url);
  const [fullPath, setFullPath] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined')
      setFullPath(
        window.location.href
          .split(process.env.NEXT_PUBLIC_BASE_URL || '')
          .at(-1) || ''
      );
  }, [typeof window === 'undefined' ? {} : window?.location?.href]);

  return (
    <div className="w-full">
      <div className="flex w-full items-center gap-2">
        <Link href={url} passHref target={foreign ? '_blank' : '_self'}>
          <div
            onClick={() => {
              if (onClick) onClick();
            }}
            className={`slide-right group flex flex-1 cursor-pointer items-center gap-2 rounded-full px-4 py-3 ${
              isActive ? 'bg-primary-lighter' : 'bg-transparent'
            }`}
          >
            <div className="flex flex-1 items-center gap-2">
              <Icon
                className={`text-2xl ${
                  isActive ? 'text-primary-main' : 'text-aima-black'
                } group-hover:!text-primary-main`}
                icon={icon}
              />
              <Text
                className={`${
                  isActive ? 'text-primary-main' : 'text-aima-black'
                } group-hover:!text-primary-main`}
              >
                {title}
              </Text>
            </div>
          </div>
        </Link>

        {actionButton && (
          <div className="grid h-10 w-10 place-items-center rounded-full hover:bg-black/10">
            <Link href={actionButton?.url}>
              <a>
                <Icon
                  icon={actionButton?.icon}
                  className="text-2xl text-aima-black"
                />
              </a>
            </Link>
          </div>
        )}
      </div>

      {children && isActive && (
        <div className="py-3 pl-12">
          {children.map((item, index) => (
            <Link href={item.url} key={index} passHref>
              <a className="group flex w-full items-center gap-3 py-3">
                <Text
                  className={`${
                    fullPath.startsWith(item.url)
                      ? 'font-semibold text-primary-main'
                      : 'text-aima-black'
                  } group-hover:!text-primary-main`}
                >
                  {item.title}
                </Text>
              </a>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SideNavLink;
