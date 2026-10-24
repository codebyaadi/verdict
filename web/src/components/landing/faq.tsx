import { ChevronDown } from 'lucide-react';

export const faqs = [
  {
    q: 'Is Verdict ready to use today?',
    a: 'Not yet. It is early access: accounts and sign-in work now. Cases, collectors, the graph and reports are being built in that order, and every feature on this page is labelled Live or Coming soon.',
  },
  {
    q: 'Is it passive?',
    a: 'Yes. Verdict only reads public sources. It does not port scan, exploit anything, log in to other sites or use leaked-database dumps, and every collector run is written to an audit log.',
  },
  {
    q: 'Can I look people up with it?',
    a: 'Only through public profiles that a person chose to publish, and only inside a case with a stated purpose. There is no facial recognition and no data-broker lookup.',
  },
  {
    q: 'What does the AI do?',
    a: 'It is opt-in. It summarises a case, suggests next steps and drafts report text, using only what is already in the case. It cannot run collectors or fetch anything on its own.',
  },
  {
    q: 'Is it open source?',
    a: 'The code is MIT licensed on GitHub. Verdict itself is offered as a hosted service, which is where the data sources, upkeep and support come from.',
  },
  {
    q: 'What will it cost?',
    a: 'Pricing is not decided yet. Early users will get notice before anything changes.',
  },
];

export function Faq() {
  return (
    <section id='faq' className='scroll-mt-24 px-4 py-24'>
      <div className='mx-auto max-w-3xl'>
        <p className='text-brand text-center text-sm font-semibold'>FAQ</p>
        <h2 className='mt-3 text-center text-4xl font-extrabold tracking-tighter text-balance sm:text-5xl'>
          Straight answers.
        </h2>
        <div className='mt-12 space-y-3'>
          {faqs.map((item) => (
            <details
              key={item.q}
              className='group bg-card/70 rounded-3xl border px-6 py-5 backdrop-blur open:shadow-[var(--shadow-panel)]'
            >
              <summary className='flex cursor-pointer list-none items-center justify-between gap-4 font-semibold'>
                {item.q}
                <ChevronDown className='text-muted-foreground size-5 shrink-0 transition-transform group-open:rotate-180' />
              </summary>
              <p className='text-muted-foreground mt-3 leading-relaxed'>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
