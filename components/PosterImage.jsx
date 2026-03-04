'use client';

import { useState } from 'react';

const TMDB_BASE = 'https://image.tmdb.org/t/p/w500';

const FALLBACK_GRADIENTS = [
  ['#1a3a2a','#2d6b47'],
  ['#2a1a3a','#6b2d5a'],
  ['#3a2a1a','#8b6020'],
  ['#1a2a3a','#2d5a6b'],
  ['#2a3a1a','#5a6b2d'],
  ['#3a1a2a','#6b2d40'],
];

export default function PosterImage({ src, alt, title, index = 0, className = '' }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const grad = FALLBACK_GRADIENTS[index % FALLBACK_GRADIENTS.length];
  const initial = (title || alt || '?')[0].toUpperCase();

  return (
    <div className={`relative w-full h-full ${className}`}>

      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${grad[0]}, ${grad[1]})` }}
      >
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '3.5rem',
          fontWeight: 700,
          color: 'rgba(201,125,78,0.4)',
          lineHeight: 1,
          userSelect: 'none',
        }}>
          {initial}
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.5rem',
          color: 'rgba(201,125,78,0.3)',
          letterSpacing: '0.2em',
          marginTop: '0.5rem',
          textTransform: 'uppercase',
        }}>
          {(title || alt || '').substring(0, 16)}
        </span>
      </div>

      {!failed && (
        <img
          src={src}
          alt={alt}
          className={`poster-img absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
