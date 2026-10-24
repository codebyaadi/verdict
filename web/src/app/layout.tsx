import type { Metadata } from 'next';
import { Geist_Mono, Sora } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { cn } from '@/lib/utils';
import './globals.css';

const sora = Sora({ subsets: ['latin'], variable: '--font-sora', display: 'swap' });
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Casebook: a case file for the open web',
  description:
    'Collect public data, connect it, and prove where every fact came from. A passive OSINT investigation workspace.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning className={cn(sora.variable, geistMono.variable)}>
      <body>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
