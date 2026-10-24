import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Cta() {
  return (
    <section className='px-4 py-24'>
      <div className='bg-card/70 mx-auto max-w-5xl rounded-[2rem] border p-8 text-center shadow-[var(--shadow-panel)] backdrop-blur-xl sm:p-16'>
        <h2 className='mx-auto max-w-2xl text-4xl font-extrabold tracking-tighter text-balance sm:text-5xl'>
          Open your first case<span className='text-brand'>.</span>
        </h2>
        <p className='text-muted-foreground mx-auto mt-5 max-w-xl text-lg leading-relaxed text-pretty'>
          Create an account and be first in line as cases, collectors and the evidence graph go
          live.
        </p>
        <div className='mt-8 flex justify-center'>
          <Button size='lg' nativeButton={false} render={<Link href='/sign-in' />}>
            Get started <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
}
