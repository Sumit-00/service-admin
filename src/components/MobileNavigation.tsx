import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';
import hamburgerMenu from '../../public/icons/hamburgerMenu.svg';
import RenderNavigation from './RenderNavigation';

export default function MobileNavigation() {
  return (
    <div className="flex sm:hidden">
      <Sheet>
        <SheetTrigger>
          <Image
            priority
            src={hamburgerMenu}
            alt="Hamburger Menu for mobile navigation"
            className="ml-3"
          />
        </SheetTrigger>
        <SheetContent className="px-0">
          <RenderNavigation />
        </SheetContent>
      </Sheet>
    </div>
  );
}
