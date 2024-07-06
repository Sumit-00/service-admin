import { BRAND_NAME } from '@/constants/constants';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import logo from '../../public/icons/wework-logo.svg';
import Link from './ui/link';

const MobileNavigation = dynamic(() => import('./MobileNavigation'), {
  ssr: false,
});

interface IHeaderProps {
  userName?: string;
}

export default function Header(props: IHeaderProps) {
  const { userName = 'Username' } = props;

  return (
    <header className="border-border sticky top-0 z-10 border-b bg-white">
      <div className="wrapper wrapper-padding flex items-center justify-between">
        <Link href={'/'} className="px-0">
          <Image
            priority
            src={logo}
            alt={`${BRAND_NAME} logo`}
            width={162}
            height={48}
            className="-ml-[0.4rem] object-contain"
          />
        </Link>
        <div className="flex items-center">
          {/* TODO: Login area */}
          <span className="mr-3 text-a16 font-bold">{userName}</span>
          <Link
            href="/profile"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-blue font-bold text-white no-underline"
          >
            {userName.charAt(0)}
          </Link>
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}
