'use client';
import { useState, useEffect } from 'react';
import { movies } from '../data/movies';

const TOP = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 5);

export default function HeroSection() {
  const [idx, setIdx]       = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => { setIdx(i => (i + 1) % TOP.length); setFading(false); }, 600);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const stats = [
    { n: movies.length,                                     l: 'Films' },
    { n: [...new Set(movies.map(m => m.category))].length,  l: 'Genres' },
    { n: [...new Set(movies.map(m => m.director))].length,  l: 'Directors' },
  ];

  return (
    <section className="relative min-h-[64vh] flex items-end pb-16 overflow-hidden">

      {TOP.map((m, i) => (
        <div key={m.id} className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
          style={{ backgroundImage: m.backdrop ? `url(${m.backdrop})` : 'none',
            opacity: i === idx && !fading ? 0.28 : 0 }}
        />
      ))}

      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'linear-gradient(to top, var(--bg-base) 25%, rgba(17,19,24,0.5) 100%)' }}/>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'linear-gradient(to right, var(--bg-base) 0%, transparent 55%)' }}/>
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background:'linear-gradient(90deg, transparent, var(--rose), transparent)' }}/>

      <div className="absolute top-24 right-6 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full"
        style={{ background:'rgba(17,19,24,0.75)', border:'1px solid var(--border)', backdropFilter:'blur(8px)' }}>
        <span className="block w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:'var(--rose)' }}/>
        <span style={{ fontFamily:'var(--f-mono)', fontSize:'0.6rem', letterSpacing:'0.15em',
          textTransform:'uppercase', color:'var(--text-sec)' }}>
          {TOP[idx].title}
        </span>
      </div>

      <div className="absolute bottom-6 right-6 flex gap-1.5">
        {TOP.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className="rounded-full transition-all duration-300"
            style={{ width: i === idx ? '20px' : '6px', height:'6px',
              background: i === idx ? 'var(--rose)' : 'var(--border-hi)' }}
            aria-label={`Show ${TOP[i].title}`}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 w-full">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-8 h-px" style={{ background:'var(--rose)' }}/>
            <span style={{ fontFamily:'var(--f-mono)', fontSize:'0.65rem', letterSpacing:'0.2em',
              textTransform:'uppercase', color:'var(--rose)' }}>
              Discover Cinema
            </span>
          </div>
          <h1 className="mb-4 leading-[1.05]"
            style={{ fontFamily:'var(--f-display)', fontSize:'clamp(2.6rem,7vw,5rem)', fontWeight:700, color:'var(--text)' }}>
            Great films,<br/>
            <em className="rose-shimmer not-italic">curated for you.</em>
          </h1>
          <p className="mb-8 leading-relaxed"
            style={{ color:'var(--text-sec)', maxWidth:'30rem', fontSize:'1rem' }}>
            {movies.length} handpicked films. Search, filter, like, and build your perfect watchlist.
          </p>
          <div className="flex items-center gap-8">
            {stats.map(({ n, l }) => (
              <div key={l}>
                <p style={{ fontFamily:'var(--f-mono)', fontSize:'1.5rem', fontWeight:700, color:'var(--rose)', lineHeight:1 }}>{n}</p>
                <p style={{ fontSize:'0.7rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--text-mute)', marginTop:'4px' }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
