'use client';
import { useMovies } from '../../context/MovieContext';
import { movies } from '../../data/movies';
import MovieCard from '../../components/MovieCard';
import Link from 'next/link';

export default function LikedPage() {
  const { likedMovies } = useMovies();
  const liked = movies.filter(m => likedMovies.includes(m.id));

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="block w-7 h-px" style={{ background: 'var(--rose)' }}/>
            <span style={{ fontFamily: 'var(--f-mono)', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--rose)' }}>
              Your Collection
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--f-display)', fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 700, color: 'var(--text)', marginBottom: '0.4rem' }}>
            Liked Films
          </h1>
          <p style={{ color: 'var(--text-sec)', fontSize: '0.9rem' }}>
            {liked.length === 0 ? 'Films you love will appear here.' : `${liked.length} film${liked.length !== 1 ? 's' : ''} liked`}
          </p>
        </div>

        <div className="accent-divider mb-10"/>

        {liked.length === 0 ? (
          <div className="flex flex-col items-center py-28 text-center">
            <svg className="w-14 h-14 mb-6" style={{ color: 'var(--border-hi)' }} fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            <h3 style={{ fontFamily: 'var(--f-display)', fontSize: '1.5rem', color: 'var(--text)', fontWeight: 600, marginBottom: '0.6rem' }}>
              Nothing liked yet
            </h3>
            <p style={{ color: 'var(--text-sec)', fontSize: '0.875rem', maxWidth: '20rem', marginBottom: '1.8rem' }}>
              Explore the collection and like films that move you.
            </p>
            <Link href="/" className="px-7 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: 'var(--rose)', color: '#fff' }}>
              Browse Films
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {liked.map((m, i) => <MovieCard key={m.id} movie={m} index={i}/>)}
          </div>
        )}
      </div>
    </div>
  );
}
