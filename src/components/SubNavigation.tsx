'use client';

import { INAVIGATION_ROUTE } from '@/constants/routes';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';
import ChevronIcon from '../../public/icons/chevron.svg';
import { Button } from './ui/button';
import Link from './ui/link';

interface SubNavigationProps {
  section: INAVIGATION_ROUTE;
  className?: string;
}

const SubNavigation: React.FC<SubNavigationProps> = ({ section, className }) => {
  const pathname = usePathname();
  const [isSubNavOpen, setIsSubNavOpen] = React.useState<boolean>(
    pathname.indexOf(section.path) > -1 || false,
  );

  const handleNavClick = () => {
    setIsSubNavOpen((prev) => !prev);
  };

  return (
    <React.Fragment>
      <Button
        variant="link"
        onClick={handleNavClick}
        className={cn('flex justify-between gap-x-2.5', className)}
      >
        <span>{section.name}</span>
        <Image
          src={ChevronIcon}
          alt="chevron-down"
          width={18}
          className={isSubNavOpen ? 'rotate-180' : ''}
        />
      </Button>
      {isSubNavOpen && section.nestedRoutes && (
        <ul className="ps-8">
          {section.nestedRoutes.map((item: INAVIGATION_ROUTE) => {
            return (
              <li key={item.name}>
                <Link href={item.path} className="text-a14">
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </React.Fragment>
  );
};

export default SubNavigation;
