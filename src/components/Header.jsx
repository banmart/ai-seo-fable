"use client";

import { useState } from 'react';
import MenuOverlay from './MenuOverlay';

/* Header — fixed site header with brand and deploy CTA */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="/">
          GOBIYA<span className="brand__tick">_</span>
        </a>
        <button 
          className="menu-toggle mono" 
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={isMenuOpen}
        >
          [ SYS.NAV ]
        </button>
      </header>
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
