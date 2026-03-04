'use client';
import { useMovies } from '../../context/MovieContext';
import { movies } from '../../data/movies';
import MovieCard from '../../components/MovieCard';
import Link from 'next/link';

export default function WatchLaterPage() {
  const { watchLaterMovies } = useMovies();
  const saved = movies.filter(m => watchLaterMovies.includes(m.id));
  const hours = Math.floor(saved.reduce((a, m) => a + m.duration, 0) / 60);
  const mins  = saved.reduce((a, m) => a + m.duration, 0) % 60;

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="block w-7 h-px" style={{ background: 'var(--teal)' }}/>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--teal)' }}>
              Your Queue
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--f-display)', fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 700, color: 'var(--text)', marginBottom: '0.4rem' }}>
            Watch Later
          </h1>
          <p style={{ color: 'var(--text-sec)', fontSize: '0.9rem' }}>
            {saved.length === 0
              ? 'Films you save will appear here.'
              : `${saved.length} film${saved.length !== 1 ? 's' : ''} · ${hours}h ${mins}m total`}
          </p>
        </div>

        <div className="accent-divider mb-10"/>

        {saved.length === 0 ? (
          <div className="flex flex-col items-center py-28 text-center">
            <svg className="w-14 h-14 mb-6" style={{ color: 'var(--border-hi)' }} fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
            </svg>
            <h3 style={{ fontFamily: 'var(--f-display)', fontSize: '1.5rem', color: 'var(--text)', fontWeight: 600, marginBottom: '0.6rem' }}>
              Queue is empty
            </h3>
            <p style={{ color: 'var(--text-sec)', fontSize: '0.875rem', maxWidth: '20rem', marginBottom: '1.8rem' }}>
              Save films to build your personal screening schedule.
            </p>
            <Link href="/" className="px-7 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: 'var(--teal)', color: '#111318' }}>
              Discover Films
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {saved.map((m, i) => <MovieCard key={m.id} movie={m} index={i}/>)}
          </div>
        )}
      </div>
    </div>
  );
}
