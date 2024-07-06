// /components/DialogBox.tsx
'use client';

import * as React from 'react';
import {
  Dialog,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from './ui/dialog';
import { Button, ButtonProps } from './ui/button';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { ScrollBar } from './ui/scroll-area';

interface DialogBoxProps<TSuccess, TError> {
  title: React.ReactNode;
  cancelButtonProps?: ButtonProps;
  confirmButtonProps?: Omit<ButtonProps, 'onClick'> & {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<TSuccess | TError>;
  };
  trigger: React.ReactNode;
  footer?: React.ReactNode;
  body: (onClose: () => void) => React.ReactNode;
  className?: string;
}

export function DialogBox<TSuccess, TError>({
  title,
  body,
  trigger,
  footer,
  cancelButtonProps,
  confirmButtonProps,
  className,
}: DialogBoxProps<TSuccess, TError>) {
  const [Open, setOpen] = React.useState(false);

  const handleConfirm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    return confirmButtonProps?.onClick?.(e)?.then(() => setOpen(false));
  };

  const onClose = () => setOpen(false);

  return (
    <Dialog open={Open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={className || ''}>
        <DialogHeader className="px-1">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[75vh] w-full overflow-y-auto">
          <div className="h-full">{body?.(onClose)}</div>
          <ScrollBar orientation="vertical" hidden />
        </ScrollArea>
        {footer !== undefined ? (
          footer
        ) : (
          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button variant="outline" {...cancelButtonProps}>
                Cancel
              </Button>
            </DialogClose>

            <Button {...confirmButtonProps} onClick={handleConfirm}>
              Confirm
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default DialogBox;
