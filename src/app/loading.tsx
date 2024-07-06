import Image from 'next/image';

import spinner from '../../public/icons/spinner.gif';

export default function Loading() {
  return (
    <div className="flex h-screen-minus-header items-center justify-center">
      <Image src={spinner} alt="WeWork India loading gif" className="ml-3 h-56 w-56" />
    </div>
  );
}
