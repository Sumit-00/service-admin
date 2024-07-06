import '@/styles/fonts.css';
import '@/styles/globals.css';
import DesktopNavigation from '@/components/DesktopNavigation';
import Header from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: `%s | WeWork India Ops tool`,
    default: 'WeWork India Ops tool',
  },
  description: 'WeWork India tool to handle operations for WeWork India',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-dvh flex-col overflow-hidden font-sans text-a16 antialiased">
        <Header />
        <main className="wrapper wrapper-padding flex flex-1 items-start justify-start py-0 md:pr-0">
          <DesktopNavigation />
          <div className="w-app-container flex-1 overflow-auto">{children}</div>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
