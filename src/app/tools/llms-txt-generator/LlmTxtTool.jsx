'use client';

import { useState } from 'react';

export default function LlmTxtTool() {
  const [siteName, setSiteName] = useState('');
  const [siteUrl, setSiteUrl] = useState('');
  const [description, setDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [docsUrl, setDocsUrl] = useState('');
  const [generatedTxt, setGeneratedTxt] = useState('');
  const [copied, setCopied] = useState(false);

  const generateLlmTxt = (e) => {
    e.preventDefault();
    
    let txt = `# ${siteName}\n`;
    txt += `> ${description}\n\n`;
    txt += `## Primary Links\n`;
    txt += `- [Home](${siteUrl})\n`;
    
    if (docsUrl) {
      txt += `- [Documentation](${docsUrl})\n`;
    }
    
    txt += `\n## Contact\n`;
    txt += `- [Contact Email](mailto:${contactEmail})\n`;

    setGeneratedTxt(txt);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (!generatedTxt) return;
    navigator.clipboard.writeText(generatedTxt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
      {/* Form Section */}
      <section className="mcp-section" style={{ margin: 0, padding: '2rem', background: 'rgba(0, 0, 0, 0.4)' }}>
        <h2 className="mono" style={{ fontSize: '1rem', color: 'var(--cyan)', marginBottom: '1.5rem' }}>// CONFIGURE</h2>
        <form className="deploy-form" onSubmit={generateLlmTxt} style={{ textAlign: 'left' }}>
          
          <label htmlFor="f-name" className="mono">SITE NAME</label>
          <input 
            id="f-name" 
            type="text" 
            placeholder="e.g., Gobiya" 
            value={siteName} 
            onChange={(e) => setSiteName(e.target.value)} 
            required 
          />

          <label htmlFor="f-url" className="mono">ROOT URL</label>
          <input 
            id="f-url" 
            type="url" 
            placeholder="https://" 
            value={siteUrl} 
            onChange={(e) => setSiteUrl(e.target.value)} 
            required 
          />

          <label htmlFor="f-desc" className="mono">DESCRIPTION (FOR LLMS)</label>
          <input 
            id="f-desc" 
            type="text" 
            placeholder="Briefly describe what this site is or does..." 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />

          <label htmlFor="f-email" className="mono">CONTACT EMAIL</label>
          <input 
            id="f-email" 
            type="email" 
            placeholder="sales@company.com" 
            value={contactEmail} 
            onChange={(e) => setContactEmail(e.target.value)} 
            required 
          />

          <label htmlFor="f-docs" className="mono">DOCUMENTATION URL (OPTIONAL)</label>
          <input 
            id="f-docs" 
            type="url" 
            placeholder="https://.../docs" 
            value={docsUrl} 
            onChange={(e) => setDocsUrl(e.target.value)} 
          />

          <button type="submit" className="cta" style={{ width: '100%', marginTop: '1rem' }}>
            Generate llms.txt →
          </button>
        </form>
      </section>

      {/* Output Section */}
      <section className="mcp-section" style={{ margin: 0, padding: '2rem', display: 'flex', flexDirection: 'column' }}>
        <h2 className="mono" style={{ fontSize: '1rem', color: 'var(--cyan)', marginBottom: '1.5rem' }}>// OUTPUT</h2>
        <div style={{ flex: 1, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '4px', position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <textarea 
            readOnly 
            value={generatedTxt} 
            placeholder="Your llms.txt output will appear here..."
            style={{ 
              flex: 1, 
              width: '100%', 
              background: 'transparent', 
              border: 'none', 
              color: 'var(--text)', 
              fontFamily: 'var(--font-mono)', 
              fontSize: '0.9rem', 
              padding: '1.5rem',
              resize: 'none',
              outline: 'none',
              minHeight: '300px'
            }} 
          />
          {generatedTxt && (
            <button 
              onClick={copyToClipboard}
              className="cta cta--ghost mono" 
              style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.5rem 1rem', fontSize: '0.8rem' }}
            >
              {copied ? 'COPIED!' : 'COPY'}
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
