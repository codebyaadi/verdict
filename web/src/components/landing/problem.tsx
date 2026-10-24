import { FileX, Layers, ShieldAlert } from 'lucide-react';

const points = [
  {
    icon: Layers,
    title: 'Scattered across a dozen tabs',
    body: 'Registry lookups, DNS tools, code search and screenshots end up in different places. Verdict keeps every lead in one case, connected in a graph.',
  },
  {
    icon: FileX,
    title: 'Findings you cannot prove',
    body: 'A screenshot is not evidence. Verdict stores the source, the time of collection, a snapshot and a hash for every fact, so a claim can be traced back.',
  },
  {
    icon: ShieldAlert,
    title: 'Tools that cross the line',
    body: 'Verdict is passive and public-only. It does not scan, exploit or log in to other sites, and every collector run is written to an audit log.',
  },
];

export function Problem() {
  return (
    <section className='px-4 py-24'>
      <div className='mx-auto max-w-5xl'>
        <p className='text-brand text-center text-sm font-semibold'>Why Verdict</p>
        <h2 className='mx-auto mt-3 max-w-3xl text-center text-4xl font-extrabold tracking-tighter text-balance sm:text-5xl'>
          Research you can hand to someone and defend.
        </h2>
        <div className='mt-14 grid gap-4 md:grid-cols-3'>
          {points.map((p) => (
            <div
              key={p.title}
              className='bg-card/70 rounded-3xl border p-7 backdrop-blur transition-shadow hover:shadow-[var(--shadow-panel)]'
            >
              <div className='bg-accent text-accent-foreground grid size-11 place-items-center rounded-2xl'>
                <p.icon className='size-5' />
              </div>
              <h3 className='mt-6 text-xl font-bold tracking-tight'>{p.title}</h3>
              <p className='text-muted-foreground mt-2 leading-relaxed'>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
