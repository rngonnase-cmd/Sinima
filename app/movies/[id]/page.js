'use client';
import { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { movies } from '../../../data/movies';
import { useMovies } from '../../../context/MovieContext';

const ratingColors = {
  G: '#10b981', PG: '#60a5fa', 'PG-13': '#f59e0b', R: '#E8385A', 'NC-17': '#a855f7',
};

function Poster({ src, title }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="absolute inset-0" style={{ background:'linear-gradient(160deg,#1a2535,#0a0d12)' }}>
      <div className="absolute inset-0 flex items-end p-4">
        <span style={{ fontFamily:'var(--f-display)', fontSize:'4rem', fontWeight:700, color:'rgba(232,56,90,0.2)', lineHeight:1 }}>
          {title[0]}
        </span>
      </div>
      {src && !failed && (
        <img src={src} alt={title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

function RelatedCard({ movie }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  return (
    <Link href={`/movies/${movie.id}`} className="group block">
      <div className="relative rounded-lg overflow-hidden movie-card border" style={{ aspectRatio:'2/3', borderColor:'var(--border)' }}>
        <div className="absolute inset-0" style={{ background:'linear-gradient(160deg,#1a2535,#0a0d12)' }} />
        {movie.poster && !failed && (
          <img src={movie.poster} alt={movie.title}
            className={`poster-img absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        )}
        <div className="absolute inset-0" style={{ background:'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }} />
        <div className="absolute bottom-3 left-3 right-3">
          <p className="related-title text-xs font-semibold leading-tight"
            style={{ fontFamily:'var(--f-display)', color:'var(--text)' }}>
            {movie.title}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function MovieDetailPage({ params }) {
  const movie = movies.find(m => m.id === params.id);
  if (!movie) notFound();

  const { toggleLike, toggleWatchLater, isLiked, isWatchLater, setSelectedActor, setSelectedCategory } = useMovies();
  const liked = isLiked(movie.id);
  const saved = isWatchLater(movie.id);
  const rc    = ratingColors[movie.kind] || '#5C6478';
  const getYTId = url => { const m = url.match(/(?:v=|youtu\.be\/)([^&?#]+)/); return m ? m[1] : null; };
  const ytId = getYTId(movie.trailer);
  const related = movies.filter(m => m.id !== movie.id && (m.category === movie.category || m.actors.some(a => movie.actors.includes(a)))).slice(0, 4);
  const stars = Array.from({ length: 10 }, (_, i) => i < Math.round(movie.rating));

  return (
    <div className="min-h-screen">
      <div className="relative h-[52vh] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: movie.backdrop ? `url(${movie.backdrop})` : 'none', opacity:0.3, filter:'blur(1px)' }} />
        <div className="absolute inset-0" style={{ background:'linear-gradient(to bottom, rgba(17,19,24,0.3) 0%, var(--bg-base) 100%)' }} />
        <div className="absolute inset-0" style={{ background:'linear-gradient(to right, var(--bg-base) 0%, transparent 60%)' }} />
        <div className="absolute top-20 left-6">
          <Link href="/" className="back-btn inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-36 relative z-10 pb-20">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0 w-44 md:w-56">
            <div className="relative rounded-xl overflow-hidden shadow-2xl" style={{ aspectRatio:'2/3', border:'1px solid var(--border)' }}>
              <Poster src={movie.poster} title={movie.title} />
            </div>
          </div>

          <div className="flex-1 pt-6">
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="rating-badge" style={{ borderColor:rc, color:rc }}>{movie.kind}</span>
              <span style={{ fontFamily:'var(--f-mono)', fontSize:'0.68rem', color:'var(--text-mute)', textTransform:'uppercase', letterSpacing:'0.1em' }}>{movie.type}</span>
              <span style={{ fontFamily:'var(--f-mono)', fontSize:'0.68rem', color:'var(--text-mute)' }}>{new Date(movie.dateReleased).getFullYear()}</span>
              <span style={{ fontFamily:'var(--f-mono)', fontSize:'0.68rem', color:'var(--text-mute)' }}>{Math.floor(movie.duration/60)}h {movie.duration%60}m</span>
            </div>
            <h1 className="leading-tight mb-2" style={{ fontFamily:'var(--f-display)', fontSize:'clamp(1.8rem,5vw,3rem)', fontWeight:700, color:'var(--text)' }}>
              {movie.title}
            </h1>
            <p className="mb-4 text-sm" style={{ color:'var(--text-sec)' }}>
              Directed by <span style={{ color:'var(--text)', fontWeight:600 }}>{movie.director}</span>
            </p>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex gap-0.5">
                {stars.map((f, i) => (
                  <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill={f ? 'var(--rose)' : 'var(--border-hi)'}>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <span style={{ fontFamily:'var(--f-mono)', fontSize:'1.4rem', fontWeight:700, color:'var(--rose)' }}>{movie.rating.toFixed(1)}</span>
              <span style={{ fontSize:'0.8rem', color:'var(--text-mute)' }}>/ 10</span>
            </div>
            <p className="text-sm leading-relaxed mb-5 max-w-2xl" style={{ color:'var(--text-sec)' }}>{movie.epilogue}</p>
            <div className="flex items-center gap-3 mb-4">
              <span style={{ fontFamily:'var(--f-mono)', fontSize:'0.65rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--text-mute)' }}>Genre</span>
              <Link href="/" onClick={() => setSelectedCategory(movie.category)}>
                <span className="genre-pill px-3 py-1 rounded-full text-xs font-semibold cursor-pointer">{movie.category}</span>
              </Link>
            </div>
            <div className="mb-4">
              <p style={{ fontFamily:'var(--f-mono)', fontSize:'0.65rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--text-mute)', marginBottom:'8px' }}>Cast</p>
              <div className="flex flex-wrap gap-2">
                {movie.actors.map(a => (
                  <Link key={a} href="/" onClick={() => setSelectedActor(a)}>
                    <span className="cast-pill px-3 py-1.5 rounded-lg text-sm cursor-pointer">{a}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <p style={{ fontFamily:'var(--f-mono)', fontSize:'0.65rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--text-mute)', marginBottom:'8px' }}>Keywords</p>
              <div className="flex flex-wrap gap-2">
                {movie.keywords.map(k => (
                  <span key={k} className="px-2.5 py-1 rounded text-xs"
                    style={{ background:'var(--bg-raised)', border:'1px solid var(--border)', color:'var(--text-mute)', fontFamily:'var(--f-mono)' }}>
                    #{k}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => toggleLike(movie.id)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-85"
                style={liked ? { background:'var(--rose)', color:'#fff', boxShadow:'0 4px 20px rgba(232,56,90,0.35)' } : { border:'1px solid var(--border)', color:'var(--text-sec)', background:'transparent' }}>
                <svg className="w-4 h-4" fill={liked?'currentColor':'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                {liked ? 'Liked' : 'Like'}
              </button>
              <button onClick={() => toggleWatchLater(movie.id)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-85"
                style={saved ? { background:'var(--teal)', color:'#111318', boxShadow:'0 4px 20px rgba(30,200,160,0.3)' } : { border:'1px solid var(--border)', color:'var(--text-sec)', background:'transparent' }}>
                <svg className="w-4 h-4" fill={saved?'currentColor':'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                </svg>
                {saved ? 'Saved' : 'Save'}
              </button>
              <a href={movie.trailer} target="_blank" rel="noopener noreferrer"
                className="trailer-btn flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                Trailer
              </a>
            </div>
          </div>
        </div>

        {ytId && (
          <div className="mt-14">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px" style={{ background:'var(--border)' }} />
              <span style={{ fontFamily:'var(--f-mono)', fontSize:'0.65rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--text-mute)' }}>Official Trailer</span>
              <div className="flex-1 h-px" style={{ background:'var(--border)' }} />
            </div>
            <div className="relative rounded-xl overflow-hidden" style={{ paddingTop:'56.25%', border:'1px solid var(--border)' }}>
              <iframe src={`https://www.youtube.com/embed/${ytId}`} title={`${movie.title} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen className="absolute inset-0 w-full h-full" />
            </div>
          </div>
        )}

        {related.length > 0 && (
          <div className="mt-14">
            <div className="flex items-center gap-4 mb-7">
              <div className="flex-1 h-px" style={{ background:'var(--border)' }} />
              <span style={{ fontFamily:'var(--f-mono)', fontSize:'0.65rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--text-mute)' }}>You Might Also Like</span>
              <div className="flex-1 h-px" style={{ background:'var(--border)' }} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map(m => <RelatedCard key={m.id} movie={m} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
