import Link from 'next/link';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

const links = [
  { href: '#how', label: 'How it works' },
  { href: '#collectors', label: 'Sources' },
  { href: '#features', label: 'Features' },
  { href: '#faq', label: 'FAQ' },
];

export function Navbar() {
  return (
    <header className='fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6'>
      <nav
        aria-label='Main'
        className='bg-card/70 mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full border pr-2 pl-4 shadow-[var(--shadow-panel)] backdrop-blur-xl'
      >
        <Link href='/' aria-label='Casebook home'>
          <Logo />
        </Link>

        <ul className='hidden items-center gap-1 lg:flex'>
          {links.map((l) => (
            <li key={l.href}>
              <Button
                variant='ghost'
                size='sm'
                className='text-muted-foreground'
                nativeButton={false}
                render={<a href={l.href} />}
              >
                {l.label}
              </Button>
            </li>
          ))}
        </ul>

        <div className='flex items-center gap-1.5'>
          <ThemeToggle />
          <Button
            variant='ghost'
            size='sm'
            className='hidden sm:inline-flex'
            nativeButton={false}
            render={<Link href='/sign-in' />}
          >
            Sign in
          </Button>
          <Button size='sm' nativeButton={false} render={<Link href='/sign-in' />}>
            Get started
          </Button>
        </div>
      </nav>
    </header>
  );
}
