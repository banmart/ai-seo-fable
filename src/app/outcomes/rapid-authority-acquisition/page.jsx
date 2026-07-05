import SubpageLayout from '../../../components/SubpageLayout';

export const metadata = {
  title: 'Rapid Authority Acquisition — Skip Years of Domain Building | GOBIYA',
  description:
    'The outcome: launch with the trust signals of an established site. Vetted aged-domain acquisition, clean link inheritance, and entity continuity — without the spam baggage.',
  alternates: { canonical: '/outcomes/rapid-authority-acquisition' },
};

export default function RapidAuthorityPage() {
  return (
    <SubpageLayout>
      <p className="kicker mono">// OUTCOME 03 — AUTHORITY STATE: ACQUIRED</p>
      <h1>Day One.<br />Year Five Authority.</h1>
      <p className="lede">
        The outcome we engineer: your project launches on a domain that already carries clean
        history, real backlinks, and archive continuity — compressing the years-long trust
        ramp that kills most new sites before they rank for anything.
      </p>

      <section aria-labelledby="h-mechanism">
        <h2 id="h-mechanism">How it's built</h2>
        <ul className="spec-list">
          <li>
            <span className="mono spec-id">M-01</span>
            <h3>Forensic domain vetting</h3>
            <p>
              Registration records, Wayback snapshots, dark years, and backlink provenance —
              every candidate domain is screened before acquisition. Most aged domains are
              landmines; we buy the ones that aren't.
            </p>
          </li>
          <li>
            <span className="mono spec-id">M-02</span>
            <h3>Continuity engineering</h3>
            <p>
              Legacy URLs redirected with intent, topical adjacency preserved, and the entity
              transition documented in schema — so search systems read a handover, not a hijack.
            </p>
          </li>
          <li>
            <span className="mono spec-id">M-03</span>
            <h3>Inherited-link triage</h3>
            <p>
              Every inherited backlink classified: keep, disavow, or reclaim. The authority you
              paid for is preserved; the spam that came with it is surgically removed.
            </p>
          </li>
        </ul>
      </section>

      <section aria-labelledby="h-measure">
        <h2 id="h-measure">How it's measured</h2>
        <ul className="proof-grid">
          <li>
            <strong className="mono">TTI</strong>
            <span>time-to-index and time-to-first-ranking versus a cold-start baseline</span>
          </li>
          <li>
            <strong className="mono">LNK</strong>
            <span>referring domains retained through migration, net of disavowed toxicity</span>
          </li>
          <li>
            <strong className="mono">CRL</strong>
            <span>crawl frequency and depth — proof that search systems treat the site as established</span>
          </li>
        </ul>
      </section>

      <section aria-labelledby="h-solves">
        <h2 id="h-solves">Problems this resolves</h2>
        <a className="xlink" href="/problems/google-penalty">
          <span className="xlink__label">// PROBLEM 02</span>
          <strong>Bought a domain with baggage? Traffic fell off a cliff. →</strong>
        </a>
        <a className="xlink" href="/tools/aged-domain-lookup">
          <span className="xlink__label">// FREE DIAGNOSTIC</span>
          <strong>Vet any domain yourself — Aged Domain Lookup →</strong>
        </a>
      </section>

      <a className="cta" href="/#apex">Request Deployment Brief →</a>
    </SubpageLayout>
  );
}
