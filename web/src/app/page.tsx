import { Collectors } from '@/components/landing/collectors';
import { Cta } from '@/components/landing/cta';
import { Faq, faqs } from '@/components/landing/faq';
import { Features } from '@/components/landing/features';
import { Footer } from '@/components/landing/footer';
import { Hero } from '@/components/landing/hero';
import { HowItWorks } from '@/components/landing/how-it-works';
import { Navbar } from '@/components/landing/navbar';
import { Problem } from '@/components/landing/problem';
import { site } from '@/lib/site';

// Escape "<" so the JSON can never close the script tag early.
const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${site.url}/#software`,
      name: site.name,
      url: site.url,
      description: site.description,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      license: 'https://opensource.org/licenses/MIT',
      codeRepository: site.github,
      keywords: site.keywords.join(', '),
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
}).replaceAll('<', '\\u003c');

export default function HomePage() {
  return (
    <div className='ambient min-h-screen'>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Collectors />
        <Features />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
