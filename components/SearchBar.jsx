'use client';
import { useRef } from 'react';
import { useMovies } from '../context/MovieContext';

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useMovies();
  const ref = useRef(null);

  return (
    <div className="relative">
      <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
        style={{ color: 'var(--text-mute)' }}
        fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
      </svg>
      <input
        ref={ref}
        type="text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Search films, actors, keywords…"
        className="search-input w-full pl-10 pr-9 py-3 rounded-lg text-sm"
        style={{ fontFamily: 'var(--f-body)', color: 'var(--text)' }}
      />
      {searchQuery && (
        <button
          onClick={() => { setSearchQuery(''); ref.current?.focus(); }}
          className="icon-btn absolute right-3 top-1/2 -translate-y-1/2"
          aria-label="Clear search">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      )}
    </div>
  );
}
