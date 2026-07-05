import SubpageLayout from '../../../components/SubpageLayout';

export const metadata = {
  title: 'Traffic Crashed? Google Penalty & Core Update Recovery | GOBIYA',
  description:
    'Manual action, core update crash, or a domain that came with baggage — diagnose which one hit you and what structured recovery looks like.',
  alternates: { canonical: '/problems/google-penalty' },
};

const faqs = [
  {
    q: 'How do I know if it\'s a manual action or an algorithmic drop?',
    a: 'Manual actions appear in Search Console under Security & Manual Actions — if that panel is empty, you were hit algorithmically. Algorithmic drops cluster around documented update dates; compare your traffic-drop date against Google\'s update timeline.',
  },
  {
    q: 'Can a domain be penalized before I even own it?',
    a: 'Manual actions can persist through ownership changes, and a toxic backlink profile or spam history transfers with the domain. This is why we scan domain history before any acquisition or migration.',
  },
  {
    q: 'How long does recovery take?',
    a: 'Manual action reconsiderations resolve in weeks once the violation is genuinely fixed. Core-update recoveries typically wait for a subsequent update cycle — months, not days. Anyone promising faster is guessing.',
  },
];

export default function GooglePenaltyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <SubpageLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <p className="kicker mono">// PROBLEM 02 — INDEX STATE: SUPPRESSED</p>
      <h1>Traffic Didn't Dip.<br />It Fell Off a Cliff.</h1>
      <p className="lede">
        A 60% overnight drop is not seasonality. It's a manual action, a core-update reappraisal,
        or inherited domain baggage. Each has a different recovery path — and treating the wrong
        one burns months.
      </p>

      <section aria-labelledby="h-diagnose">
        <h2 id="h-diagnose">Diagnosis sequence</h2>
        <ul className="spec-list">
          <li>
            <span className="mono spec-id">D-01</span>
            <h3>Manual action check</h3>
            <p>
              Search Console first. A manual action means a human reviewer flagged a specific
              violation — the notice tells you the class of problem, and recovery runs through
              a reconsideration request backed by real remediation.
            </p>
          </li>
          <li>
            <span className="mono spec-id">D-02</span>
            <h3>Update-timeline correlation</h3>
            <p>
              No manual action? Map the drop date against Google's update calendar. Core updates
              reappraise quality sitewide; spam updates target link schemes and scaled content.
              The overlap tells you what got reassessed.
            </p>
          </li>
          <li>
            <span className="mono spec-id">D-03</span>
            <h3>Domain history audit</h3>
            <p>
              If the site is on an acquired or aged domain, its past is your present: previous
              spam usage, toxic backlink inheritance, dark years. We scan registration and
              archive records before assuming the problem is your content.
            </p>
          </li>
        </ul>
        <a className="xlink" href="/tools/aged-domain-lookup">
          <span className="xlink__label">// FREE DIAGNOSTIC</span>
          <strong>Run the Aged Domain Lookup — check your domain's past in 10 seconds →</strong>
        </a>
      </section>

      <section aria-labelledby="h-fix">
        <h2 id="h-fix">The resolution</h2>
        <p>
          Recovery is forensic, not cosmetic: isolate the trigger, remediate it completely
          (link disavowal, content consolidation, structural cleanup), then rebuild the quality
          signals that survive future updates. The goal isn't just recovery — it's a site
          architecture that core updates strengthen instead of punish.
        </p>
        <a className="xlink" href="/outcomes/algorithm-proof">
          <span className="xlink__label">// OUTCOME</span>
          <strong>Algorithm-proof: growth that survives every core update →</strong>
        </a>
      </section>

      <section aria-labelledby="h-faq">
        <h2 id="h-faq">FAQ</h2>
        <ul className="faq">
          {faqs.map(({ q, a }) => (
            <li key={q}>
              <h3>{q}</h3>
              <p>{a}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="cta-group" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}><a className="cta" href="/#apex">Request Deployment Brief →</a><a className="cta cta--ghost mono" href="tel:3237441338">📞 (323) 744-1338</a></div>
    </SubpageLayout>
  );
}
