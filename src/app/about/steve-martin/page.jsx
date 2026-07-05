import SubpageLayout from '../../../components/SubpageLayout';
import './SteveMartin.css';

export const metadata = {
  title: 'Steve Martin: SEO & Dev LA, founded Gobiya 2010, BBB A+ | Gobiya',
  description: 'Steve Martin is the founder of Gobiya, an SEO and web development agency in Los Angeles established in 2010. 25+ years in web development and search, Google Partner 2015–2019, BBB A+ rated.',
  alternates: { canonical: '/about/steve-martin' },
};

export default function SteveMartinPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: 'Steve Martin',
      jobTitle: 'CEO, Lead Developer & Marketer',
      worksFor: {
        '@type': 'Organization',
        name: 'Gobiya',
        url: 'https://www.gobiya.com',
      },
      image: 'https://www.gobiya.com/images/steve-portrait.webp',
      description: 'Steve Martin is the CEO, Lead Developer, and Marketer at Gobiya, with 25+ years of experience helping contractors, dental practices, real estate, and SaaS startups grow through organic search, paid media, and custom React/Vite development.',
      url: 'https://www.gobiya.com/about/steve-martin',
      sameAs: ['https://www.linkedin.com/in/stevemartingobiya/'],
      knowsAbout: [
        'Search Engine Optimization (SEO)',
        'Generative Engine Optimization (GEO)',
        'React Engineering',
        'B2B Sales Pipeline Automation',
        'Paid Media (PPC)',
        'Digital PR & Link Building',
      ],
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Glendale Career College',
      },
    },
  };

  return (
    <SubpageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="steve-header-area">
        <div className="steve-header-text">
          <p className="kicker mono">// GOBIYA / LEADERSHIP & ENGINEERING</p>
          <h1>Steve Martin</h1>
          <p className="lede">Founder, Lead Developer & Marketer at Gobiya</p>
        </div>
        <img src="/assets/images/steve-portrait-thumb.webp" alt="Steve Martin" className="steve-profile-img" />
      </div>
      
      <p className="steve-intro">
        Steve Martin founded Gobiya in 2010 and incorporated it as Gobiya LLC in 2012. 
        He started his career in web technology in 1996 at AT&T WorldNet in Burbank, 
        then built a video content distribution platform for Sony Music artists at Webcastr.com 
        in West Hollywood from 2000 to 2005. He has worked in SEO since Google's early years 
        and was a certified Google Partner for Google Ads and Analytics from 2015 to 2019. 
        Gobiya is BBB A+ rated and located at 
        3580 Wilshire Blvd, Ste 132, Los Angeles, CA 90010.
      </p>

      <section className="steve-section">
        <h2 className="steve-h2">Quick Overview</h2>
        <p className="steve-summary">
          Steve Martin is the founder of Gobiya and its lead developer — he builds the actual 
          websites, tools, and automation systems hands-on. With over 25 years in search and 
          digital marketing, he connects technical engineering and organic search directly to pipeline.
        </p>

        <div className="steve-grid">
          <div className="steve-card">
            <span className="mono spec-id">01</span>
            <h3>25+ Years in Search Engineering</h3>
            <p>Direct hands-on search engineering since 1999 across contractors, healthcare, SaaS, and e-commerce verticals. Google-certified in YouTube Advertising and Analytics (2015–2019).</p>
          </div>
          <div className="steve-card">
            <span className="mono spec-id">02</span>
            <h3>Entity & AI Search Specialist</h3>
            <p>Schema markup, GEO, and structured data for Google AI Overviews, ChatGPT, and Perplexity citation optimization.</p>
          </div>
          <div className="steve-card">
            <span className="mono spec-id">03</span>
            <h3>React & Full-Stack Builder</h3>
            <p>Builds custom React/Vite sites and Supabase-backed tools directly — no delegation to junior staff or offshore teams.</p>
          </div>
          <div className="steve-card">
            <span className="mono spec-id">04</span>
            <h3>B2B Pipeline Attribution</h3>
            <p>Connects organic search programs to CRM pipeline and closed-won revenue — not just rankings or traffic volume.</p>
          </div>
          <div className="steve-card">
            <span className="mono spec-id">05</span>
            <h3>Multi-Industry Track Record</h3>
            <p>SaaS startups, dental and medical practices, real estate agencies, contractors, and professional service firms.</p>
          </div>
        </div>
      </section>

      <section className="steve-section">
        <h2 className="steve-h2">Common Questions</h2>
        <ul className="faq">
          <li>
            <h3>Who is Steve Martin at Gobiya?</h3>
            <p>Steve Martin is the founder of Gobiya and its lead developer and marketer. Unlike agency principals who delegate all technical work, Steve writes the code, implements the schema, configures the analytics, and runs the actual SEO programs he designs. He has 25+ years of search engineering experience across multiple industries, holds Google certifications in YouTube Advertising and Analytics, and operates Gobiya as a BBB A+ rated business.</p>
          </li>
          <li>
            <h3>What industries has Steve Martin worked in?</h3>
            <p>Steve Martin has worked across SaaS startups, contractors and home services, dental and medical practices, real estate agencies, e-commerce businesses, and professional service firms. His current primary focus is B2B companies seeking to connect organic search programs to CRM pipeline and closed-won revenue rather than just traffic volume.</p>
          </li>
          <li>
            <h3>What is Steve Martin's current SEO specialization?</h3>
            <p>Steve Martin currently specializes in entity-based SEO for Google's Knowledge Graph, Generative Engine Optimization (GEO) for AI tools like ChatGPT and Perplexity, schema markup and structured data implementation, React and Vite web development for technical SEO, and AI-powered lead generation and CRM pipeline automation.</p>
          </li>
        </ul>
      </section>

      <div className="cta-group" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}><a className="cta" href="/#apex">Work with Steve →</a><a className="cta cta--ghost mono" href="tel:3237441338">📞 (323) 744-1338</a></div>
    </SubpageLayout>
  );
}
