const areas = [
  {
    name: 'Domains and infrastructure',
    who: 'First',
    lead: 'Registration, DNS, certificates',
    body: 'Registration data, DNS records, certificate transparency logs, IP and network ownership, web technologies and archived snapshots.',
  },
  {
    name: 'Code and leaks',
    who: 'Second',
    lead: 'Public repositories',
    body: 'Public GitHub users and organisations, commit emails, accidentally published secrets in public repositories, and package maintainers.',
  },
  {
    name: 'Organisations and people',
    who: 'Third',
    lead: 'Public profiles only',
    body: 'Profiles a person chose to publish and public company records. Every case needs a stated purpose, and there is no facial recognition.',
  },
  {
    name: 'Images and location',
    who: 'Later',
    lead: 'Metadata and maps',
    body: 'Image metadata, perceptual hashes and reverse-image links, and map correlation for coordinates you already have.',
  },
];

export function Collectors() {
  return (
    <section id='collectors' className='scroll-mt-24 px-4 py-24'>
      <div className='mx-auto max-w-5xl'>
        <p className='text-brand text-center text-sm font-semibold'>Sources</p>
        <h2 className='mx-auto mt-3 max-w-3xl text-center text-4xl font-extrabold tracking-tighter text-balance sm:text-5xl'>
          Four kinds of public data, one case.
        </h2>
        <p className='text-muted-foreground mx-auto mt-5 max-w-2xl text-center text-lg leading-relaxed text-pretty'>
          Collectors are small, isolated and passive. Each one declares its source and its rate
          limits. They are being built in this order.
        </p>

        <ol className='mt-14 grid gap-4 md:grid-cols-2'>
          {areas.map((a, i) => (
            <li key={a.name} className='bg-card/70 relative rounded-3xl border p-7 backdrop-blur'>
              <div className='flex items-center justify-between'>
                <span className='text-brand text-sm font-semibold'>
                  {i + 1}. {a.name}
                </span>
                <span className='bg-secondary text-secondary-foreground rounded-full px-2.5 py-1 text-xs font-medium'>
                  {a.who}
                </span>
              </div>
              <p className='mt-5 text-2xl font-extrabold tracking-tighter'>{a.lead}</p>
              <p className='text-muted-foreground mt-2 leading-relaxed'>{a.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
