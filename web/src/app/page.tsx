import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const features = [
  {
    title: 'Cases, not tabs',
    body: 'Every investigation is a case with a stated purpose and scope. Seeds go in, public data comes out, nothing is lost in a browser history.',
    status: 'Coming soon',
  },
  {
    title: 'Evidence you can defend',
    body: 'Each fact keeps its source, the time it was fetched, a snapshot and a hash, so a report can show exactly where a claim came from.',
    status: 'Coming soon',
  },
  {
    title: 'Passive and public only',
    body: 'No scanning, no exploitation, no logins on other sites. Every collector run is audit-logged, and AI only explains what is already in the case.',
    status: 'Principle',
  },
];

function Pill({ children, muted }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <span
      className={
        'rounded-full px-2.5 py-0.5 text-xs font-semibold ' +
        (muted ? 'bg-secondary text-secondary-foreground' : 'bg-primary text-primary-foreground')
      }
    >
      {children}
    </span>
  );
}

export default function HomePage() {
  return (
    <div className='ambient min-h-screen'>
      <header className='fixed inset-x-0 top-0 z-20 px-3 pt-3'>
        <nav className='bg-card/70 mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full border px-4 shadow-[var(--shadow-panel)] backdrop-blur-xl'>
          <Link href='/' aria-label='Casebook home'>
            <Logo />
          </Link>
          <div className='flex items-center gap-1'>
            <ThemeToggle />
            <Button size='sm' nativeButton={false} render={<Link href='/sign-in' />}>
              Sign in
            </Button>
          </div>
        </nav>
      </header>

      <main>
        <section className='mx-auto max-w-5xl px-4 pt-36 pb-16 sm:pt-44'>
          <p className='text-brand text-sm font-semibold'>OSINT investigation workspace</p>
          <h1 className='mt-4 max-w-3xl text-5xl leading-[1.02] font-extrabold tracking-tighter text-balance sm:text-6xl lg:text-7xl'>
            A case file for <span className='text-brand'>the open web.</span>
          </h1>
          <p className='text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed text-pretty'>
            Collect public data, connect it, and prove where every fact came from. Open a case, add
            a seed, and follow the trail with the evidence attached.
          </p>
          <div className='mt-8 flex flex-wrap gap-3'>
            <Button size='lg' nativeButton={false} render={<Link href='/sign-in' />}>
              Get started <ArrowRight />
            </Button>
            <Button size='lg' variant='outline' nativeButton={false} render={<a href='#how' />}>
              How it works
            </Button>
          </div>

          <Card className='mt-14 max-w-2xl shadow-[var(--shadow-panel)]'>
            <div className='space-y-4 px-6'>
              <div className='flex items-center gap-3 text-sm'>
                <Pill>CASE</Pill>
                <span className='font-mono'>example.com</span>
                <Pill muted>Preview</Pill>
              </div>
              <div className='flex gap-2'>
                <Input aria-label='Seed' defaultValue='example.com' />
                <Button>Add seed</Button>
              </div>
              <div className='text-muted-foreground flex h-32 items-center justify-center rounded-2xl border border-dashed text-sm'>
                Findings and evidence will show here
              </div>
            </div>
          </Card>
        </section>

        <section id='how' className='mx-auto max-w-5xl px-4 py-24'>
          <h2 className='text-4xl font-extrabold tracking-tighter text-balance sm:text-5xl'>
            Built for <span className='text-brand'>proof</span>, not just search.
          </h2>
          <div className='mt-10 grid gap-4 sm:grid-cols-3'>
            {features.map((f) => (
              <Card key={f.title} className='hover:shadow-[var(--shadow-panel)]'>
                <div className='px-6'>
                  <div className='flex justify-end'>
                    <Pill muted={f.status !== 'Live'}>{f.status}</Pill>
                  </div>
                  <h3 className='mt-4 text-xl font-bold tracking-tight'>{f.title}</h3>
                  <p className='text-muted-foreground mt-3 leading-relaxed'>{f.body}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className='text-muted-foreground mx-auto max-w-5xl px-4 pb-10 text-xs'>
        Casebook is open source under the MIT licence. Built by codebyaadi.
      </footer>
    </div>
  );
}
