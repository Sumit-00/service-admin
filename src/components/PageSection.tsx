import { cn } from '@/lib/utils';
import type { ComponentPropsWithRef, ReactNode } from 'react';

export default function PageSection({
  title,
  children,
  className,
  rightChildNode,
  ...rest
}: PageSectionProps) {
  return (
    <section className={cn('h-screen-minus-header w-full', className)} {...rest}>
      <div className="flex items-center justify-between border-b border-solid py-4 sm:p-4">
        <h1 className="font-serif text-w24 font-bold">{title}</h1>
        <div>{rightChildNode}</div>
      </div>
      {children}
    </section>
  );
}

type PageSectionProps = ComponentPropsWithRef<'section'> & {
  title: string;
  rightChildNode?: ReactNode;
};
