'use client';
import { useMemo } from 'react';
import { movies } from '../data/movies';
import { useMovies } from '../context/MovieContext';
import MovieCard from './MovieCard';

export default function MovieList() {
  const { searchQuery, selectedCategory, selectedActor, selectedType } = useMovies();

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return movies.filter(m => {
      const matchQ = !q || [m.title, m.category, m.director, ...m.actors, ...m.keywords]
        .some(s => s.toLowerCase().includes(q));
      return matchQ
        && (!selectedCategory || m.category === selectedCategory)
        && (!selectedActor   || m.actors.includes(selectedActor))
        && (!selectedType    || m.type === selectedType);
    });
  }, [searchQuery, selectedCategory, selectedActor, selectedType]);

  if (!filtered.length) return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <svg className="w-12 h-12 mb-5" style={{ color: 'var(--border-hi)' }} fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"/>
      </svg>
      <h3 style={{ fontFamily: 'var(--f-display)', fontSize: '1.4rem', color: 'var(--text)', marginBottom: '0.5rem', fontWeight: 600 }}>
        No films found
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-sec)', maxWidth: '22rem' }}>
        Try adjusting your search or clearing filters.
      </p>
    </div>
  );

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.7rem', color: 'var(--text-mute)', letterSpacing: '0.08em' }}>
          {filtered.length} {filtered.length === 1 ? 'film' : 'films'}
        </span>
        <div className="flex-1 h-px" style={{ background: 'var(--border)' }}/>
        <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.7rem', color: 'var(--text-mute)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          By Rating
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...filtered].sort((a, b) => b.rating - a.rating).map((m, i) => (
          <MovieCard key={m.id} movie={m} index={i}/>
        ))}
      </div>
    </div>
  );
}
