import Link from 'next/link';
import { ArrowRight, Radar } from 'lucide-react';
import { ProductPreview } from '@/components/landing/product-preview';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className='relative px-4 pt-36 pb-16 sm:pt-44'>
      <div className='animate-in fade-in slide-in-from-bottom-4 mx-auto flex max-w-4xl flex-col items-center text-center duration-700'>
        <span className='bg-card/70 text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium backdrop-blur'>
          <Radar className='text-brand size-3.5' />
          Passive OSINT investigation workspace
        </span>
        <h1 className='mt-6 text-5xl leading-[1.02] font-extrabold tracking-tighter text-balance sm:text-6xl lg:text-7xl'>
          A case file for
          <br />
          <span className='text-brand'>the open web.</span>
        </h1>
        <p className='text-muted-foreground mt-6 max-w-2xl text-lg leading-relaxed text-pretty'>
          Open a case, add a domain, a username or a repository, and Verdict collects what is
          public, connects it, and keeps the evidence behind every fact so you can show your work.
        </p>
        <div className='mt-9 flex flex-col items-center gap-3 sm:flex-row'>
          <Button size='lg' nativeButton={false} render={<Link href='/sign-in' />}>
            Get started <ArrowRight />
          </Button>
          <Button size='lg' variant='outline' nativeButton={false} render={<a href='#how' />}>
            See how it works
          </Button>
        </div>
        <p className='text-muted-foreground mt-5 text-xs'>
          Early access · Public sources only · Open source (MIT)
        </p>
      </div>

      <div className='animate-in fade-in slide-in-from-bottom-8 mx-auto mt-16 max-w-5xl duration-1000'>
        <ProductPreview />
      </div>
    </section>
  );
}
