import { Logo } from '@/components/logo';
import { site } from '@/lib/site';

const year = new Date().getFullYear();

export function Footer() {
  const link = 'text-muted-foreground hover:text-foreground';
  return (
    <footer className='border-t px-4 py-12'>
      <div className='mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-center'>
        <div className='space-y-3'>
          <Logo />
          <p className='text-muted-foreground max-w-xs text-sm'>A case file for the open web.</p>
        </div>
        <nav aria-label='Footer' className='flex flex-wrap gap-x-6 gap-y-2 text-sm'>
          <a href='#how' className={link}>
            How it works
          </a>
          <a href='#features' className={link}>
            Features
          </a>
          <a href='#faq' className={link}>
            FAQ
          </a>
          <a href={site.github} target='_blank' rel='noreferrer' className={link}>
            GitHub
          </a>
        </nav>
      </div>
      <p className='text-muted-foreground mx-auto mt-8 max-w-5xl text-xs'>
        © {year} Verdict · MIT licensed
      </p>
    </footer>
  );
}
