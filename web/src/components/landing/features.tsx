import { Fingerprint, History, Network, ScrollText, ShieldCheck, Sparkles } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Accounts and sessions',
    body: 'Sign up with email and password. Your cases are private to your account.',
    live: true,
  },
  {
    icon: Fingerprint,
    title: 'Evidence that holds up',
    body: 'Every fact keeps its source, the time it was collected, a raw snapshot and a SHA-256 hash.',
    live: false,
  },
  {
    icon: Network,
    title: 'Entity graph and timeline',
    body: 'See how domains, addresses, accounts and repositories connect, and when each fact was observed.',
    live: false,
  },
  {
    icon: History,
    title: 'Audit log',
    body: 'Every collector run is recorded with who ran it, why and what it returned.',
    live: false,
  },
  {
    icon: ScrollText,
    title: 'Reports',
    body: 'Export Markdown or PDF with an evidence appendix, ready to share or archive.',
    live: false,
  },
  {
    icon: Sparkles,
    title: 'AI that explains, never acts',
    body: 'Opt-in summaries and suggested next steps from data already in the case. It never runs collectors on its own.',
    live: false,
  },
];

export function Features() {
  return (
    <section id='features' className='scroll-mt-24 px-4 py-24'>
      <div className='mx-auto max-w-5xl'>
        <p className='text-brand text-center text-sm font-semibold'>Features</p>
        <h2 className='mx-auto mt-3 max-w-3xl text-center text-4xl font-extrabold tracking-tighter text-balance sm:text-5xl'>
          Built for proof, not for demos.
        </h2>
        <div className='mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {features.map((f) => (
            <div
              key={f.title}
              className='bg-card/70 rounded-3xl border p-7 backdrop-blur transition-shadow hover:shadow-[var(--shadow-panel)]'
            >
              <div className='flex items-start justify-between'>
                <div className='bg-accent text-accent-foreground grid size-11 place-items-center rounded-2xl'>
                  <f.icon className='size-5' />
                </div>
                <span
                  className={
                    'rounded-full px-2.5 py-1 text-xs font-semibold ' +
                    (f.live
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground')
                  }
                >
                  {f.live ? 'Live' : 'Coming soon'}
                </span>
              </div>
              <h3 className='mt-6 text-xl font-bold tracking-tight'>{f.title}</h3>
              <p className='text-muted-foreground mt-2 leading-relaxed'>{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
