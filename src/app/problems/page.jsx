import SubpageLayout from '../../components/SubpageLayout';

export const metadata = {
  title: "What's Breaking Your Search Revenue — Diagnosis Index | GOBIYA",
  description:
    'Invisible to AI assistants, penalty crashes, traffic without leads, unindexed pages, AI Overviews eating your clicks — find your symptom and its resolution path.',
  alternates: { canonical: '/problems' },
};

const problems = [
  {
    href: '/problems/invisible-to-ai',
    id: 'P-01',
    name: 'Invisible to AI',
    desc: "Your buyers ask ChatGPT and Perplexity category questions. Your brand never comes up.",
  },
  {
    href: '/problems/google-penalty',
    id: 'P-02',
    name: 'Google Penalty',
    desc: "Traffic didn't dip — it fell off a cliff. Manual action, core-update crash, or inherited domain baggage.",
  },
  {
    href: '/problems/traffic-no-leads',
    id: 'P-03',
    name: 'Traffic, No Leads',
    desc: 'Sessions climb, pipeline stays flat. You rank for queries your buyers never ask.',
  },
  {
    href: '/problems/pages-not-indexed',
    id: 'P-04',
    name: 'Pages Not Indexed',
    desc: "A thousand pages published, forty indexed. Google has judged your pattern and declined the rest.",
  },
  {
    href: '/problems/losing-clicks-to-ai',
    id: 'P-05',
    name: 'Losing Clicks to AI',
    desc: 'Rankings stable, CTR collapsing — AI Overviews answer the query before anyone scrolls to you.',
  },
];

export default function ProblemsPage() {
  return (
    <SubpageLayout>
      <p className="kicker mono">// PROBLEMS — FAULT REGISTRY</p>
      <h1>What's Breaking Your Search Revenue</h1>
      <p className="lede">
        Every symptom below has a diagnosis sequence and a named resolution. Find yours, run the
        free diagnostic where one exists, and see exactly what fixing it looks like.
      </p>
      <ul className="spec-list">
        {problems.map((p) => (
          <li key={p.id}>
            <span className="mono spec-id">{p.id}</span>
            <h3>
              <a href={p.href} style={{ color: 'var(--text)', textDecoration: 'none' }}>
                {p.name} <span style={{ color: 'var(--cyan)' }}>→</span>
              </a>
            </h3>
            <p>{p.desc}</p>
          </li>
        ))}
      </ul>
      <a className="xlink" href="/outcomes">
        <span className="xlink__label">// INVERSE INDEX</span>
        <strong>Start from the end state instead — what we make happen →</strong>
      </a>
      <a className="cta" href="/#apex">Request Deployment Brief →</a>
    </SubpageLayout>
  );
}
