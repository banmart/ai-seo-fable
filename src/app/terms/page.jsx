import SubpageLayout from '../../components/SubpageLayout';

export const metadata = {
  title: 'Terms of Service | GOBIYA',
  description: 'The terms that govern your use of gobiya.com and the free tools published on it.',
  alternates: { canonical: '/terms' },
};

export default function TermsOfServicePage() {
  return (
    <SubpageLayout>
      <p className="kicker mono">// LEGAL — TERMS OF SERVICE</p>
      <h1>Terms of Service</h1>
      <p className="lede">Last updated: July 8, 2026</p>

      <section aria-labelledby="h-accept">
        <h2 id="h-accept">Acceptance of Terms</h2>
        <p>
          These Terms of Service ("Terms") govern your use of gobiya.com (the "Site"), operated
          by GOBIYA ("Gobiya," "we," "us," or "our"). By using the Site — including its free
          diagnostic tools — you agree to these Terms. If you do not agree, please do not use the
          Site.
        </p>
      </section>

      <section aria-labelledby="h-tools">
        <h2 id="h-tools">Free Tools</h2>
        <p>
          Gobiya publishes free diagnostic and utility tools (for example, the AI Visibility
          Checker, Schema Validator, and llms.txt Generator, listed at{' '}
          <a href="/tools">/tools</a>). These tools are provided "as is," for informational
          purposes, without warranty of any kind. Results are automated estimates and should not
          be treated as a substitute for a full audit or professional advice. We do not guarantee
          the accuracy, completeness, or continued availability of any tool.
        </p>
      </section>

      <section aria-labelledby="h-conduct">
        <h2 id="h-conduct">Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul className="proof-grid">
          <li><strong className="mono">→</strong><span>Use the Site or its tools to attack, scan, or scrape third-party systems without authorization</span></li>
          <li><strong className="mono">→</strong><span>Submit false or misleading information through our forms or MCP server</span></li>
          <li><strong className="mono">→</strong><span>Attempt to disrupt, reverse-engineer, or overload the Site or its API/MCP endpoints</span></li>
        </ul>
      </section>

      <section aria-labelledby="h-mcp">
        <h2 id="h-mcp">MCP Server &amp; API Use</h2>
        <p>
          The Gobiya MCP server (<a href="/mcp">/mcp</a>) is provided for AI agents and developers
          to query public information about our services and, optionally, submit a project brief
          on a user's behalf. Automated or bulk use that is not a good-faith attempt to evaluate
          or engage Gobiya's services is not permitted and may be rate-limited or blocked.
        </p>
      </section>

      <section aria-labelledby="h-ip">
        <h2 id="h-ip">Intellectual Property</h2>
        <p>
          The Site's design, text, and code are owned by Gobiya or its licensors and protected by
          applicable intellectual property laws. You may not reproduce, resell, or create
          derivative works from the Site without our written permission.
        </p>
      </section>

      <section aria-labelledby="h-engagements">
        <h2 id="h-engagements">Paid Engagements</h2>
        <p>
          Submitting a deployment brief, quote request, or booking a consultation through this
          Site does not create a client relationship or any obligation on either party. A
          services engagement begins only once both parties sign a separate written agreement
          covering scope, pricing, and terms.
        </p>
      </section>

      <section aria-labelledby="h-liability">
        <h2 id="h-liability">Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, Gobiya is not liable for any indirect,
          incidental, or consequential damages arising from your use of the Site or its tools.
          The Site is provided without warranties of any kind, express or implied.
        </p>
      </section>

      <section aria-labelledby="h-changes">
        <h2 id="h-changes">Changes to These Terms</h2>
        <p>
          We may update these Terms from time to time. Continued use of the Site after changes
          are posted constitutes acceptance of the revised Terms.
        </p>
      </section>

      <section aria-labelledby="h-contact">
        <h2 id="h-contact">Contact</h2>
        <p>
          Questions about these Terms can be sent to{' '}
          <a href="mailto:hello@gobiya.com">hello@gobiya.com</a> or{' '}
          <a href="tel:3237441338">(323) 744-1338</a>.
        </p>
      </section>

      <div className="cta-group" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <a className="cta" href="mailto:hello@gobiya.com">Contact Us About These Terms →</a>
      </div>
    </SubpageLayout>
  );
}
