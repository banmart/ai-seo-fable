"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const NAV_LINKS = [
  { id: '01', label: 'ROOT_DIR', href: '/' },
  { id: '02', label: 'TOOLS', href: '/tools' },
  { id: '03', label: 'PROBLEMS', href: '/problems' },
  { id: '04', label: 'OUTCOMES', href: '/outcomes' },
  { id: '05', label: 'MCP_SERVER', href: '/mcp' },
  { id: '06', label: 'DEPLOY_SYS', href: '/#apex' },
];

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

// A simple hook to scramble text on mount or trigger
function useScrambleText(text, trigger) {
  const [displayText, setDisplayText] = useState(text);
  
  useEffect(() => {
    if (!trigger) return;
    
    let iterations = 0;
    const maxIterations = 15;
    const interval = setInterval(() => {
      setDisplayText((prev) => 
        prev.split('')
          .map((char, index) => {
            if (index < iterations) return text[index];
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join('')
      );
      
      if (iterations >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
      }
      
      iterations += 1/3;
    }, 30);
    
    return () => clearInterval(interval);
  }, [text, trigger]);
  
  return displayText;
}

function NavItem({ index, label, href, isOpen, onClose }) {
  // Trigger scramble effect slightly staggered
  const [trigger, setTrigger] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setTrigger(true), index * 100);
      return () => clearTimeout(timer);
    } else {
      setTrigger(false);
    }
  }, [isOpen, index]);

  const scrambledText = useScrambleText(label, trigger);

  return (
    <div className="menu__item-wrapper">
      <a href={href} className="menu__link" onClick={onClose}>
        <span className="menu__link-id mono">{NAV_LINKS[index].id}.</span>
        <span className="menu__link-text">{trigger ? scrambledText : ''}</span>
      </a>
    </div>
  );
}

export default function MenuOverlay({ isOpen, onClose }) {
  const overlayRef = useRef(null);
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!overlayRef.current) return;
    
    if (isOpen) {
      gsap.to(overlayRef.current, {
        autoAlpha: 1,
        duration: 0.5,
        ease: 'power3.out'
      });
      gsap.fromTo(containerRef.current,
        { scale: 1.05, filter: 'blur(10px)' },
        { scale: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out' }
      );
    } else {
      gsap.to(overlayRef.current, {
        autoAlpha: 0,
        duration: 0.4,
        ease: 'power2.in'
      });
    }
  }, [isOpen]);

  return (
    <div className="menu-overlay" ref={overlayRef} style={{ visibility: 'hidden', opacity: 0 }}>
      <div className="menu-overlay__bg" />
      <div className="menu-overlay__grid" />
      
      <div className="menu__container" ref={containerRef}>
        <div className="menu__header">
          <p className="kicker mono">// SYSTEM_NAVIGATION</p>
          <button className="menu__close mono" onClick={onClose} aria-label="Close menu">
            [ CLOSE ]
          </button>
        </div>
        
        <nav className="menu__nav">
          {NAV_LINKS.map((link, i) => (
            <NavItem 
              key={link.id} 
              index={i} 
              label={link.label} 
              href={link.href} 
              isOpen={isOpen} 
              onClose={onClose} 
            />
          ))}
        </nav>
        
        <div className="menu__footer mono">
          <p>STATUS: ONLINE</p>
          <p>GOBIYA // CORE_SYS_v1.0</p>
        </div>
      </div>
    </div>
  );
}
