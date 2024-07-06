import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PropsWithChildren, ReactNode } from 'react';

export interface TooltipImplementationProps {
  content: ReactNode;
}

export function TooltipImplementation({
  content,
  children,
}: PropsWithChildren<TooltipImplementationProps>) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
