import SubpageLayout from '../../components/SubpageLayout';

export const metadata = {
  title: 'Outcomes We Engineer — AI Citations, Stability, Authority | GOBIYA',
  description:
    'What we make happen: brands cited by AI assistants, traffic that survives core updates, day-one domain authority, and topic-level search dominance.',
  alternates: { canonical: '/outcomes' },
};

const outcomes = [
  {
    href: '/outcomes/cited-by-ai',
    id: 'O-01',
    name: 'Cited by AI',
    desc: 'When buyers ask ChatGPT, Perplexity, or AI Overviews who solves their problem, your brand is in the answer.',
  },
  {
    href: '/outcomes/algorithm-proof',
    id: 'O-02',
    name: 'Algorithm-Proof',
    desc: 'Quality signals so structural that core updates reappraise you upward while competitors ride the rollercoaster.',
  },
  {
    href: '/outcomes/rapid-authority-acquisition',
    id: 'O-03',
    name: 'Rapid Authority Acquisition',
    desc: 'Launch on vetted aged domains carrying clean history and real backlinks — year-five trust on day one.',
  },
  {
    href: '/outcomes/semantic-search-domination',
    id: 'O-04',
    name: 'Semantic Search Domination',
    desc: 'Own an entire topic cluster so you rank across hundreds of intent variations you never individually targeted.',
  },
];

export default function OutcomesPage() {
  return (
    <SubpageLayout>
      <p className="kicker mono">// OUTCOMES — DELIVERY MANIFEST</p>
      <h1>What We Make Happen</h1>
      <p className="lede">
        Not deliverables — end states. Each outcome is engineered, measured against a named
        metric, and linked to the problem it eliminates.
      </p>
      <ul className="spec-list">
        {outcomes.map((o) => (
          <li key={o.id}>
            <span className="mono spec-id">{o.id}</span>
            <h3>
              <a href={o.href} style={{ color: 'var(--text)', textDecoration: 'none' }}>
                {o.name} <span style={{ color: 'var(--cyan)' }}>→</span>
              </a>
            </h3>
            <p>{o.desc}</p>
          </li>
        ))}
      </ul>
      <a className="xlink" href="/problems">
        <span className="xlink__label">// INVERSE INDEX</span>
        <strong>Start from the symptom instead — what's breaking your search revenue →</strong>
      </a>
      <div className="cta-group" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}><a className="cta" href="/#apex">Request Deployment Brief →</a><a className="cta cta--ghost mono" href="tel:3237441338">📞 (323) 744-1338</a></div>
    </SubpageLayout>
  );
}
