import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function OffersLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryClientProvider>
      <ScrollArea className="h-screen-minus-header">{children}</ScrollArea>
    </ReactQueryClientProvider>
  );
}
