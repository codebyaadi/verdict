import { Fingerprint, Globe, Network, ScrollText, Search } from 'lucide-react';

const steps = [
  { icon: Globe, title: 'Seed added: acme.dev', meta: 'Domain · case "Vendor review"' },
  {
    icon: Search,
    title: 'Registration and DNS collected',
    meta: 'RDAP, A, MX, NS · public sources only',
  },
  {
    icon: Network,
    title: '3 related entities found',
    meta: '2 subdomains from certificate logs, 1 mail provider',
  },
  { icon: ScrollText, title: 'Report draft ready', meta: '9 facts, every one with its evidence' },
];

export function ProductPreview() {
  return (
    <div
      className='bg-card/70 overflow-hidden rounded-3xl border text-left shadow-[var(--shadow-panel)] backdrop-blur-xl'
      aria-label='Example case'
      role='img'
    >
      <div className='flex items-center justify-between border-b px-5 py-3.5'>
        <div className='flex items-center gap-3'>
          <span className='flex gap-1.5' aria-hidden='true'>
            <span className='bg-muted-foreground/30 size-2.5 rounded-full' />
            <span className='bg-muted-foreground/30 size-2.5 rounded-full' />
            <span className='bg-muted-foreground/30 size-2.5 rounded-full' />
          </span>
          <span className='text-sm font-semibold'>Vendor review</span>
          <span className='text-muted-foreground hidden text-xs sm:inline'>Example case</span>
        </div>
        <span className='bg-accent text-accent-foreground rounded-full px-2.5 py-1 text-xs font-semibold'>
          Passive only
        </span>
      </div>

      <div className='grid gap-0 md:grid-cols-[1.15fr_1fr]'>
        <ol className='space-y-5 p-5 sm:p-6'>
          {steps.map((s) => (
            <li key={s.title} className='flex gap-3.5'>
              <span className='bg-accent text-accent-foreground grid size-9 shrink-0 place-items-center rounded-xl'>
                <s.icon className='size-4' />
              </span>
              <div className='min-w-0'>
                <p className='text-sm font-semibold'>{s.title}</p>
                <p className='text-muted-foreground text-xs leading-relaxed'>{s.meta}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className='bg-muted/60 border-t p-5 sm:p-6 md:border-t-0 md:border-l'>
          <div className='text-brand flex items-center gap-2 text-xs font-semibold'>
            <Fingerprint className='size-4' /> Evidence
          </div>
          <p className='mt-3 text-sm font-semibold'>acme.dev is registered to a privacy service</p>
          <div className='bg-card/80 text-muted-foreground mt-3 rounded-2xl border p-3.5 font-mono text-xs leading-relaxed'>
            <p>
              <span className='text-foreground'>Source:</span> RDAP, public registry
            </p>
            <p className='mt-1.5'>
              <span className='text-foreground'>Fetched:</span> 2026-10-24 09:12 UTC
            </p>
            <p className='mt-1.5 break-all'>
              <span className='text-foreground'>SHA-256:</span> 9f2c…a41b
            </p>
          </div>
          <p className='text-muted-foreground mt-4 text-xs'>
            Illustrative example. Real cases cite real sources.
          </p>
        </div>
      </div>
    </div>
  );
}
