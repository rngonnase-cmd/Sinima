'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useMovies } from '../context/MovieContext';

export default function Header() {
  const { likedMovies, watchLaterMovies } = useMovies();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const navLinks = [
    { href: '/',           label: 'Discover',    badge: null },
    { href: '/liked',      label: 'Liked',       badge: likedMovies.length,      badgeColor: 'var(--rose)' },
    { href: '/watchlater', label: 'Watch Later', badge: watchLaterMovies.length, badgeColor: 'var(--teal)' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-400 ${
        scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        <Link href="/" className="group flex items-center gap-3">
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none">

            <rect x="1" y="1" width="32" height="32" rx="8" fill="var(--bg-raised)" stroke="var(--rose)" strokeWidth="1.5"/>

            <rect x="4"  y="4" width="4" height="4" rx="1" fill="var(--rose)" opacity="0.7"/>
            <rect x="11" y="4" width="4" height="4" rx="1" fill="var(--rose)" opacity="0.7"/>
            <rect x="19" y="4" width="4" height="4" rx="1" fill="var(--rose)" opacity="0.7"/>
            <rect x="26" y="4" width="4" height="4" rx="1" fill="var(--rose)" opacity="0.7"/>

            <rect x="4"  y="26" width="4" height="4" rx="1" fill="var(--rose)" opacity="0.7"/>
            <rect x="11" y="26" width="4" height="4" rx="1" fill="var(--rose)" opacity="0.7"/>
            <rect x="19" y="26" width="4" height="4" rx="1" fill="var(--rose)" opacity="0.7"/>
            <rect x="26" y="26" width="4" height="4" rx="1" fill="var(--rose)" opacity="0.7"/>

            <path d="M13 11.5 L24 17 L13 22.5 Z" fill="var(--rose)"
              className="transition-all duration-300 group-hover:fill-white"/>
          </svg>

          <span style={{ fontFamily: 'var(--f-display)', fontWeight: 700, fontSize: '1.35rem', letterSpacing: '-0.02em', color: 'var(--text)' }}>
            Sinim<span style={{ color: 'var(--rose)' }}>á</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map(({ href, label, badge, badgeColor }) => (
            <Link key={href} href={href}
              className="nav-link flex items-center gap-2 text-sm font-medium"
              style={{ fontFamily: 'var(--f-body)' }}
            >
              {label}
              {badge > 0 && (
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: badgeColor, fontFamily: 'var(--f-mono)' }}>
                  {badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <button className="md:hidden p-2 flex flex-col gap-[5px]" onClick={() => setOpen(!open)}>
          <span className={`block h-px w-6 bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`}/>
          <span className={`block h-px w-6 bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`}/>
          <span className={`block h-px w-6 bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`}/>
        </button>
      </div>

      {open && (
        <div className="md:hidden glass-nav border-t mt-2 py-4" style={{ borderColor: 'var(--border)' }}>
          <nav className="flex flex-col gap-4 px-6">
            {navLinks.map(({ href, label, badge, badgeColor }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}
                className="flex items-center gap-2 text-sm font-medium"
                style={{ color: 'var(--text-sec)' }}>
                {label}
                {badge > 0 && <span className="text-xs px-1.5 py-0.5 rounded font-bold text-white"
                  style={{ background: badgeColor }}>{badge}</span>}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
