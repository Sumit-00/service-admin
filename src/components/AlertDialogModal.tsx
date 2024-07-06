import { ClassValue } from 'clsx';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface AlertDialogModalProps {
  description: string;
  confirmationButtonLabel: string;
  open?: boolean;
  trigger?: React.ReactNode;
  onConfirm: () => void;
  onCancel?: () => void;
  alertClassName?: ClassValue;
}

const AlertDialogModal = ({
  description,
  confirmationButtonLabel,
  trigger,
  open,
  onConfirm,
  alertClassName,
}: AlertDialogModalProps) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction className={cn(alertClassName)} autoFocus onClick={() => onConfirm()}>
            {confirmationButtonLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogModal;
