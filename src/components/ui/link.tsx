import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import type { UrlObject } from 'url';

const linkVariants = cva('no-underline inline-flex focus-visible:outline-none', {
  variants: {
    variant: {
      default:
        'bg-blue text-white hover:bg-blue-hover active:bg-blue-hover disabled:bg-gray-darkest focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue focus:bg-blue-hover',
      destructive:
        'bg-red-hover text-white hover:bg-red-dark active:bg-red-dark disabled:bg-gray-darkest focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-dark focus:bg-red-dark',
      outline:
        'bg-white text-blue border border-blue hover:bg-blue-lightest active:bg-blue-lightest focus:bg-blue-lightest focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue',
      link: 'px-1 focus-within:underline focus:underline active:underline gap-x-1 focus-visible:underline focus-visible:decoration-2 focus-visible:underline-offset-2 hover:underline hover:decoration-2 hover:underline-offset-2 active:decoration-2 active:underline-offset-2',
      unstyled: 'px-1 gap-x-1',
    },
    size: {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded px-3',
      lg: 'h-11 rounded px-8',
      icon: 'h-10 w-10',
    },
  },
  defaultVariants: {
    variant: 'link',
    size: 'default',
  },
});

export type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> &
  NextLinkProps &
  React.RefAttributes<HTMLAnchorElement> &
  VariantProps<typeof linkVariants> & {
    children?: React.ReactNode;
  };

const Link = ({ ref, className, variant = 'link', children, href, ...props }: LinkProps) => {
  return (
    <NextLink
      href={href!}
      ref={ref}
      className={cn(linkVariants({ variant, className }))}
      {...props}
    >
      {children}
    </NextLink>
  );
};

export default Link;

export type URL = string | UrlObject;
