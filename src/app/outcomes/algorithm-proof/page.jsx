import SubpageLayout from '../../../components/SubpageLayout';

export const metadata = {
  title: 'Algorithm-Proof Growth — Survive Every Core Update | GOBIYA',
  description:
    'The outcome: organic growth that core updates strengthen instead of punish. Structural quality signals, clean link inheritance, and update-resilient architecture.',
  alternates: { canonical: '/outcomes/algorithm-proof' },
};

export default function AlgorithmProofPage() {
  return (
    <SubpageLayout>
      <p className="kicker mono">// OUTCOME 02 — STABILITY STATE: HARDENED</p>
      <h1>Updates Ship.<br />Your Traffic Doesn't Flinch.</h1>
      <p className="lede">
        The outcome we engineer: a site whose quality signals are structural — so each core
        update reappraises you upward while competitors ride the rollercoaster.
      </p>

      <section aria-labelledby="h-mechanism">
        <h2 id="h-mechanism">How it's built</h2>
        <ul className="spec-list">
          <li>
            <span className="mono spec-id">M-01</span>
            <h3>Clean inheritance</h3>
            <p>
              Domain history audited, toxic links disavowed, thin and duplicative content
              consolidated. Nothing in the foundation for an update to punish.
            </p>
          </li>
          <li>
            <span className="mono spec-id">M-02</span>
            <h3>Structural quality signals</h3>
            <p>
              Entity-first architecture, demonstrable expertise on every indexable page, and
              programmatic sections quality-gated so scale never reads as spam.
            </p>
          </li>
          <li>
            <span className="mono spec-id">M-03</span>
            <h3>Update telemetry</h3>
            <p>
              Baselines captured before every announced update; drift measured after. When
              something moves, we know what and why within days — not quarters.
            </p>
          </li>
        </ul>
      </section>

      <section aria-labelledby="h-solves">
        <h2 id="h-solves">Problems this resolves</h2>
        <a className="xlink" href="/problems/google-penalty">
          <span className="xlink__label">// PROBLEM 02</span>
          <strong>Traffic didn't dip. It fell off a cliff. →</strong>
        </a>
        <a className="xlink" href="/tools/aged-domain-lookup">
          <span className="xlink__label">// FREE DIAGNOSTIC</span>
          <strong>Check what your domain is carrying — Aged Domain Lookup →</strong>
        </a>
      </section>

      <div className="cta-group" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}><a className="cta" href="/#apex">Request Deployment Brief →</a><a className="cta cta--ghost mono" href="tel:3237441338">📞 (323) 744-1338</a></div>
    </SubpageLayout>
  );
}
