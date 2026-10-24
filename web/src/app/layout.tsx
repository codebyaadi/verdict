import type { Metadata } from 'next';
import { Caveat, Recursive } from 'next/font/google';
import { cn } from '@/lib/utils';
import './globals.css';

const recursive = Recursive({
  subsets: ['latin'],
  variable: '--font-recursive',
  display: 'swap',
});
const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Casebook: a case file for the open web',
  description:
    'Collect public data, connect it, and prove where every fact came from. A passive OSINT investigation workspace.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={cn(recursive.variable, caveat.variable)}>
      <body>{children}</body>
    </html>
  );
}
