const steps = [
  {
    n: '01',
    title: 'Open a case',
    body: 'Give it a title, a purpose and a scope. Add seeds: a domain, a username, an organisation, a repository or an image.',
  },
  {
    n: '02',
    title: 'Collect and connect',
    body: 'Collectors fetch public data and turn it into entities and links. Follow a lead with one click, and every step is logged.',
  },
  {
    n: '03',
    title: 'Report with proof',
    body: 'Export a report where each finding carries its source, time and hash. AI can draft the wording, but only from what is in the case.',
  },
];

export function HowItWorks() {
  return (
    <section id='how' className='scroll-mt-24 px-4 py-24'>
      <div className='bg-primary text-primary-foreground mx-auto max-w-5xl rounded-[2rem] p-8 sm:p-14'>
        <p className='text-sm font-semibold opacity-70'>How it works</p>
        <h2 className='mt-3 max-w-2xl text-4xl font-extrabold tracking-tighter text-balance sm:text-5xl'>
          From a single lead to a finished report.
        </h2>
        <ol className='mt-12 grid gap-10 md:grid-cols-3'>
          {steps.map((s) => (
            <li key={s.n}>
              <span className='text-5xl font-extrabold tracking-tighter opacity-30'>{s.n}</span>
              <h3 className='mt-4 text-xl font-bold tracking-tight'>{s.title}</h3>
              <p className='mt-2 leading-relaxed opacity-80'>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
