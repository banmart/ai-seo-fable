"use client";

import { useState } from 'react';

export default function Tooltip({ text, children }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div 
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '8px',
            backgroundColor: 'var(--black)',
            color: 'var(--cyan)',
            border: '1px solid var(--cyan-dim)',
            padding: '0.4rem 0.8rem',
            fontSize: '0.65rem',
            fontFamily: 'var(--mono)',
            whiteSpace: 'nowrap',
            zIndex: 100,
            pointerEvents: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}
          role="tooltip"
        >
          {text}
          <div 
            style={{
              content: '""',
              position: 'absolute',
              top: '100%',
              left: '50%',
              marginLeft: '-4px',
              borderWidth: '4px',
              borderStyle: 'solid',
              borderColor: 'var(--cyan-dim) transparent transparent transparent'
            }} 
          />
        </div>
      )}
    </div>
  );
}
