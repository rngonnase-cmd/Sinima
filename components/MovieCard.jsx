'use client';
import Image from 'next/image'
import { useState } from 'react';
import Link from 'next/link';
import { useMovies } from '../context/MovieContext';

const ratingColors = {
  G: '#10b981', PG: '#60a5fa', 'PG-13': '#f59e0b', R: '#E8385A', 'NC-17': '#a855f7',
};
const gradients = [
  'linear-gradient(160deg,#1a2535,#0a0d12)',
  'linear-gradient(160deg,#1f1a35,#0d0a12)',
  'linear-gradient(160deg,#1a2520,#0a120d)',
  'linear-gradient(160deg,#2a1a1a,#120a0a)',
  'linear-gradient(160deg,#1a2030,#0a0d18)',
];

function Poster({ src, title, index }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="absolute inset-0" style={{ background: gradients[index % gradients.length] }}>
      <div className="absolute inset-0 flex items-end p-3">
        <span style={{ fontFamily:'var(--f-display)', fontSize:'2.5rem', fontWeight:700,
          color:'rgba(232,56,90,0.2)', lineHeight:1, userSelect:'none' }}>
          {title[0]}
        </span>
      </div>
      {src && !failed && (
        <Image src={src} alt={title}
          className={`poster-img absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          width={500} 
          height={750}
        />
      )}
    </div>
  );
}

export default function MovieCard({ movie, index = 0 }) {
  const { toggleLike, toggleWatchLater, isLiked, isWatchLater } = useMovies();
  const liked = isLiked(movie.id);
  const saved = isWatchLater(movie.id);
  const rc = ratingColors[movie.kind] || '#5C6478';

  return (
    <div className="movie-card group relative flex flex-col rounded-lg overflow-hidden border"
      style={{ background:'var(--bg-card)', borderColor:'var(--border)' }}>

      <Link href={`/movies/${movie.id}`} className="relative block overflow-hidden flex-shrink-0" style={{ aspectRatio:'2/3' }}>
        <Poster src={movie.poster} title={movie.title} index={index} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
        <div className="absolute top-2.5 left-2.5">
          <span className="rating-badge" style={{ borderColor:rc, color:rc, background:'rgba(0,0,0,0.7)' }}>{movie.kind}</span>
        </div>
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-1 rounded-md"
          style={{ background:'rgba(0,0,0,0.72)', backdropFilter:'blur(6px)' }}>
          <svg className="w-3 h-3" viewBox="0 0 20 20" fill="var(--rose)">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          <span style={{ fontFamily:'var(--f-mono)', fontSize:'0.7rem', fontWeight:600, color:'var(--text)' }}>{movie.rating.toFixed(1)}</span>
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-3.5">
        <Link href={`/movies/${movie.id}`}>
          <h3 className="leading-snug mb-1 line-clamp-1 transition-colors duration-200 hover:text-[var(--rose)]"
            style={{ fontFamily:'var(--f-display)', fontWeight:600, fontSize:'0.95rem', color:'var(--text)' }}>
            {movie.title}
          </h3>
        </Link>
        <div className="flex items-center justify-between mb-2">
          <span style={{ fontFamily:'var(--f-mono)', fontSize:'0.68rem', color:'var(--text-mute)' }}>
            {new Date(movie.dateReleased).getFullYear()} · {movie.duration}m
          </span>
          <span style={{ fontSize:'0.65rem', letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--text-mute)' }}>
            {movie.category}
          </span>
        </div>
        <p className="text-xs leading-relaxed line-clamp-2 mb-3.5 flex-1" style={{ color:'var(--text-sec)' }}>
          {movie.epilogue}
        </p>
        <div className="flex gap-2 pt-3 border-t" style={{ borderColor:'var(--border)' }}>
          <button onClick={() => toggleLike(movie.id)}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded text-xs font-semibold transition-all duration-200"
            style={liked ? { background:'var(--rose)', color:'#fff' } : { border:'1px solid var(--border)', color:'var(--text-sec)' }}>
            <svg className="w-3.5 h-3.5" fill={liked?'currentColor':'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
            </svg>
            {liked ? 'Liked' : 'Like'}
          </button>
          <button onClick={() => toggleWatchLater(movie.id)}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded text-xs font-semibold transition-all duration-200"
            style={saved ? { background:'var(--teal)', color:'#111318' } : { border:'1px solid var(--border)', color:'var(--text-sec)' }}>
            <svg className="w-3.5 h-3.5" fill={saved?'currentColor':'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
            </svg>
            {saved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
