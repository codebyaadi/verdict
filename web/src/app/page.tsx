import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const points = [
  'Passive and public sources only',
  'Every fact keeps its source, time and hash',
  'AI explains and suggests, it never acts',
];

export default function HomePage() {
  return (
    <>
      <header className='border-border bg-background/80 sticky top-0 z-10 border-b backdrop-blur'>
        <div className='mx-auto flex max-w-6xl items-center justify-between px-6 py-3'>
          <Link href='/' className='flex items-center gap-2 font-bold'>
            <span aria-hidden>🗂️</span> Casebook
          </Link>
          <Button variant='secondary' render={<Link href='/sign-in' />}>
            Sign in
          </Button>
        </div>
      </header>

      <main className='mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28'>
        <section>
          <h1 className='text-5xl font-bold sm:text-7xl'>Casebook</h1>
          <p className='mt-6 max-w-lg text-lg leading-relaxed'>
            Investigating the open web has always been <span className='mark-word'>scattered</span>{' '}
            and <span className='mark-word'>unprovable</span>. Not anymore. Open a case, collect
            public data, connect it, and show where every fact came from.
          </p>
          <ul className='mt-8 space-y-2 font-medium'>
            {points.map((p) => (
              <li key={p} className='flex items-start gap-3'>
                <span className='text-stamp' aria-hidden>
                  ✓
                </span>
                {p}
              </li>
            ))}
          </ul>
        </section>

        <section aria-label='Example case' className='relative'>
          <span
            className='font-hand text-stamp absolute -top-9 right-4 rotate-[-4deg] text-4xl'
            aria-hidden
          >
            Try it →
          </span>
          <Card className='backdrop-blur'>
            <CardContent className='space-y-4'>
              <div className='flex items-center gap-3 text-sm'>
                <span className='bg-foreground text-background rounded px-2 py-0.5 text-xs font-semibold'>
                  CASE
                </span>
                <span className='font-mono'>example.com</span>
              </div>
              <div className='flex gap-2'>
                <Input aria-label='Seed' defaultValue='example.com' />
                <Button>Add seed</Button>
              </div>
              <div className='border-border text-muted-foreground flex h-40 items-center justify-center rounded-md border-2 border-dashed text-sm'>
                Findings and evidence will show here
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
}
