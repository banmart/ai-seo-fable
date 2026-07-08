import SubpageLayout from '../../components/SubpageLayout';

export const metadata = {
  title: 'Privacy Policy | GOBIYA',
  description: 'How GOBIYA collects, uses, and protects information from visitors to gobiya.com.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPolicyPage() {
  return (
    <SubpageLayout>
      <p className="kicker mono">// LEGAL — PRIVACY POLICY</p>
      <h1>Privacy Policy</h1>
      <p className="lede">Last updated: July 8, 2026</p>

      <section aria-labelledby="h-overview">
        <h2 id="h-overview">Overview</h2>
        <p>
          GOBIYA ("Gobiya," "we," "us," or "our") operates gobiya.com (the "Site"). This policy
          explains what information we collect from visitors, how we use it, and the choices you
          have. Gobiya is based at 3580 Wilshire Blvd, Ste 132, Los Angeles, CA 90010. You can
          reach us at <a href="mailto:hello@gobiya.com">hello@gobiya.com</a> or{' '}
          <a href="tel:3237441338">(323) 744-1338</a>.
        </p>
      </section>

      <section aria-labelledby="h-collect">
        <h2 id="h-collect">Information We Collect</h2>
        <ul className="spec-list">
          <li>
            <span className="mono spec-id">01</span>
            <h3>Information you provide</h3>
            <p>
              When you submit a form on this Site (for example, the deployment brief, contact
              form, or one of our free tools), we collect what you enter — typically your name,
              email address, company, website domain, and a description of your project or
              problem.
            </p>
          </li>
          <li>
            <span className="mono spec-id">02</span>
            <h3>Automatically collected information</h3>
            <p>
              We use Google Analytics 4 (GA4) to understand aggregate traffic and behavior on the
              Site — pages viewed, referring source, device/browser type, and approximate
              location derived from IP address. IP addresses are anonymized before being sent to
              Google.
            </p>
            <p>
              We also use Microsoft Clarity, a session-recording and heatmap tool, to see how
              visitors interact with pages (scrolling, clicks, and mouse movement) so we can
              improve the Site's usability. Clarity masks form-field input by default.
            </p>
          </li>
          <li>
            <span className="mono spec-id">03</span>
            <h3>Cookies</h3>
            <p>
              GA4 and Microsoft Clarity set first- and third-party cookies to distinguish
              visitors and sessions. You can block or delete cookies in your browser settings;
              doing so may limit some Site functionality but will not prevent you from reading
              content or contacting us directly.
            </p>
          </li>
        </ul>
      </section>

      <section aria-labelledby="h-use">
        <h2 id="h-use">How We Use Information</h2>
        <p>We use the information above to:</p>
        <ul className="proof-grid">
          <li>
            <strong className="mono">→</strong>
            <span>Respond to inquiries and deployment brief / quote requests</span>
          </li>
          <li>
            <strong className="mono">→</strong>
            <span>Operate and improve the Site, including the free tools we publish</span>
          </li>
          <li>
            <strong className="mono">→</strong>
            <span>Understand aggregate traffic patterns and Site performance</span>
          </li>
        </ul>
        <p>
          We do not sell personal information. We do not share the information you submit in a
          form with third parties except service providers who help us operate the Site (for
          example, our email delivery and hosting providers), under obligations to protect it.
        </p>
      </section>

      <section aria-labelledby="h-mcp">
        <h2 id="h-mcp">AI Agents & the Gobiya MCP Server</h2>
        <p>
          Gobiya operates a Model Context Protocol (MCP) server (see <a href="/mcp">/mcp</a>) that
          lets AI agents query public information about our services and, if you choose to submit
          a project brief through an agent, pass that information to us the same way a web form
          would. Data submitted this way is handled under this same policy.
        </p>
      </section>

      <section aria-labelledby="h-rights">
        <h2 id="h-rights">Your Choices &amp; Rights</h2>
        <p>
          If you are a California resident, the California Consumer Privacy Act (CCPA) gives you
          the right to request access to, deletion of, or an explanation of the personal
          information we hold about you. To make a request, email{' '}
          <a href="mailto:hello@gobiya.com">hello@gobiya.com</a> from the address associated with
          your inquiry. We will respond within a reasonable timeframe.
        </p>
      </section>

      <section aria-labelledby="h-retention">
        <h2 id="h-retention">Data Retention &amp; Security</h2>
        <p>
          We retain information you submit for as long as needed to respond to your inquiry and
          maintain business records, then delete or anonymize it. We use reasonable technical and
          organizational measures to protect information, but no method of transmission or
          storage is 100% secure.
        </p>
      </section>

      <section aria-labelledby="h-changes">
        <h2 id="h-changes">Changes to This Policy</h2>
        <p>
          We may update this policy as our practices change. Material changes will be reflected
          by updating the "Last updated" date above.
        </p>
      </section>

      <div className="cta-group" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <a className="cta" href="mailto:hello@gobiya.com">Contact Us About This Policy →</a>
      </div>
    </SubpageLayout>
  );
}
